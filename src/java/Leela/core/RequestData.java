package Leela.core;

import javax.servlet.http.HttpServletRequest;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Enumeration;
import java.util.Vector;

/**
 * Получение данных (файлов), переданных странице
 */
public class RequestData {
  private static class RequestContent {
    public String fileName;
    public String parName;
    public int startIndex;
    public int lastIndex;
    public String mimeType;

    public RequestContent(String parName, String fileName, String mimeType, int startIndex, int lastIndex) {
      this.parName  = parName;
      this.fileName = fileName;
      this.mimeType = mimeType;
      this.startIndex = startIndex; // включая
      this.lastIndex = lastIndex;   // не включая
    }
  }

  private RequestContent[] requestContent;
  private int paramCount;
  private byte[] data;
  private String boundary;
  private String charset  = "Windows-1251";

  /**
   * Получить кодировку страницы
   *
   * @return        Кодировка страницы
   */
  public String getCharset() {
    return this.charset;
  }

  /**
   * Установить кодировку страницы
   *
   * @param charset     Кодировка страницы
   */
  public void setCharset(String charset) {
    this.charset = charset;
  }

  /**
   * Конструктор
   *
   * @param request     переданные данные странице
   * @param maxSize     Максимальное количество данных
   */
  public RequestData(HttpServletRequest request, int maxSize) throws Exception {
    boundary = extractBoundary(request.getHeader("Content-Type"));
    data = readRequest(request, maxSize);
    extractData();
  }

  // Получить все переданные данные
  private static byte[] readRequest(HttpServletRequest request, int maxSize) throws Exception {
    BufferedInputStream bufStream = new BufferedInputStream(request.getInputStream());
    ByteArrayOutputStream arrStream = new ByteArrayOutputStream();
    int nbytes = 0;

    maxSize += 512; // учесть заголовок
    try {
      for (int b; (b = bufStream.read()) != -1; ) {
        if (++nbytes > maxSize) {
          throw new Exception("Загружаемый файл слишком большой!" +
             " (" + nbytes + " > " + maxSize + ")" );
        }
        arrStream.write(b);
      }
      return arrStream.toByteArray();
    } finally {
      bufStream.close();
      arrStream.close();
    }
  }

 private String extractBoundary(String str) {
    int index = str.lastIndexOf("boundary=");
    String v_boundary = str.substring(index + 9); // 9 - число букв в "boundary="
    return ("--" + v_boundary); // т.к. реальная граница на два символа '-' длиннее,
  }

  private void extractData() throws Exception {
    Vector dataVec = new Vector();
    String dataStr = new String(data, "ASCII");
    int index = 0, prev_index = 0;

    for (int i = 0; (index = dataStr.indexOf(boundary, index)) != -1; i++) { // Пока найден разделитель
      if (i != 0) {
        RequestContent reqContent = extractFileData(prev_index, index - 2);  // "\r\n"
        dataVec.addElement(reqContent);  // Добавим в очередь объект
      }
      index += boundary.length();
      prev_index = index;
    }
    paramCount = dataVec.size();  // Количество файлов в запросе
    requestContent = new RequestContent[paramCount];  // Создадим массив FileContent
    Enumeration en = dataVec.elements();
    for (int i = 0; en.hasMoreElements(); i++)
      requestContent[i] = (RequestContent) en.nextElement();
  }

  private RequestContent extractFileData(int indexBegin, int indexEnd) throws Exception {
    int partLength = indexEnd - indexBegin + 1; // длина части запроса
    byte[] partData = new byte[partLength];     // массив содержит часть запроса

    System.arraycopy(data, indexBegin, partData, 0, partLength);
    String dataStr = new String(partData, "ASCII");

    String header;
    String fileName = "";
    String parName = "";
    String mimeType = "";
    // отделяем заголовок
    int index = dataStr.indexOf("\r\n\r\n", 2); // этими символами отделен заголовок от содержимого (newLine)
    if (index != -1) {
      header = Charset.forName(this.charset).decode(ByteBuffer.wrap(partData, 0, index)).toString();
      parName  = parseParName(header);
      fileName = parseFileName(header);
      mimeType = parseMimeType(header);
      indexBegin += index + 4;  // 4 символа - это длина newLine
    }
    return new RequestContent(parName, fileName, mimeType, indexBegin, indexEnd);
  }

  private String parseFileName(String header) {
    String fileName;
    int index, up_index;

    if ((index = header.toLowerCase().indexOf("filename=")) != -1) {
      index += 1 + 9;
      up_index = header.indexOf('"', index);
      // ищем закрывающую кавычку после filename=".... 9+1 это длина filename="
      fileName = header.substring(index, up_index);
      index = fileName.lastIndexOf('/'); // в разных ОС по разному представляется
      up_index = fileName.lastIndexOf('\\'); // символ "file.separator"
      return fileName.substring(Math.max(index, up_index) + 1);
    }
    return "NO_FILE";
  }

  private String parseParName(String header) {
    String parName = null;
    int index, up_index;

    if ((index = header.toLowerCase().indexOf("name=")) != -1) {
      index += 1 + 5;
      up_index = header.indexOf('"', index);
      parName = header.substring(index, up_index);
    }
    return parName;
  }

  private String parseMimeType(String header) {
    String mimeType = null;
    int index, up_index;

    if ((index = header.indexOf("Content-Type: ")) != -1) {
      index += "Content-Type: ".length();
      up_index = header.indexOf("\r\n", index);
      if (up_index != -1)
        mimeType = header.substring(index, up_index);
      else
        mimeType = header.substring(index);
    }
    return mimeType;
  }

  /**
   * Получить тип переданного файла
   *
   * @param parName   Имя параметра
   * @return          Тип переданного файла
   */
  public String getMimeType(String parName) {
    for (int i = 0; i < paramCount; i++)
      if (requestContent[i].parName.equals(parName))
        return requestContent[i].mimeType;
    return null;
  }

  /**
   * Получить наименование переданного файла
   *
   * @param parName   Имя параметра
   * @return          Наименование переданного файла
   */
  public String getFileName(String parName) {
    for (int i = 0; i < paramCount; i++)
      if (requestContent[i].parName.equals(parName))
        return requestContent[i].fileName;
    return null;
  }

  /**
   * Получить размер переданного файла в байтах
   *
   * @param parName   Имя параметра
   * @return          Размер переданного файла в байтах
   */
  public long getFileSize(String parName) {
    for (int i = 0; i < paramCount; i++)
      if (requestContent[i].parName.equals(parName))
        return requestContent[i].lastIndex - requestContent[i].startIndex;
    return 0;
  }

  /**
   * Получить значение параметра
   *
   * @param parName   Имя параметра
   * @return          Значение параметра в виде массива
   */
  public byte[] getParByteValue(String parName) {
    for (int i = 0; i < paramCount; i++)
      if (requestContent[i].parName.equals(parName)) {
        int size = requestContent[i].lastIndex - requestContent[i].startIndex;
        byte[] retByte = new byte[size];
        System.arraycopy(data, requestContent[i].startIndex, retByte, 0, size);
        return retByte;
      }
    return null;
  }

  /**
   * Получить значение параметра
   *
   * @param parName   Имя параметра
   * @return          Значение параметра в виде строки
   */
  public String getParValue(String parName) {
    byte[] retByte = getParByteValue(parName);
    return (retByte == null) ? null : Charset.forName(this.charset).decode(ByteBuffer.wrap(retByte)).toString();
  }
}