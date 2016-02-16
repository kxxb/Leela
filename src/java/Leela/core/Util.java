package Leela.core;

import java.text.DecimalFormatSymbols;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.StringTokenizer;
import java.util.Date;
import java.util.Locale;
import java.util.ArrayList;

import oracle.jdbc.OracleConnection;

import java.sql.SQLException;
import java.sql.Types;
import oracle.jdbc.OracleCallableStatement;

/**
 * Общеупотребительные вспомогательные утилиты
 */
public final class Util {
  /** Короткий формат даты */
  public static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

  /** Расширенный формат даты */
  public static final SimpleDateFormat dateTimeFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm");

  /** Формат денежной суммы */
  private static final DecimalFormat currencyFormat = new DecimalFormat();
  static {
    DecimalFormatSymbols dfs = new DecimalFormatSymbols(Locale.US);
    dfs.setGroupingSeparator(' ');
    currencyFormat.setDecimalFormatSymbols(dfs);
    currencyFormat.setGroupingSize(3);
    currencyFormat.setMinimumFractionDigits(2);
    currencyFormat.setMaximumFractionDigits(8);
  }

  /**
   * Замена всех подстрок на заданную
   *
   * @param str         Исходная строка
   * @param oldSubStr   Заменяемая подстрока
   * @param newSubStr   Новая подстрока
   * @return            Изменённая исходная строка
   */
  public static String replaceAll(String str, String oldSubStr, String newSubStr) {
    String s;
    int i, len = oldSubStr.length();

    for (s = nvl(str, ""); (i = s.indexOf(oldSubStr)) != -1; s = s.substring(0, i) + newSubStr + s.substring(i + len));
    return s;
  }

  /**
   * Форматирование даты
   *
   * @param date          Дата
   * @param simDateFormat Формат
   * @param replace       Строка даты по умолчанию
   * @return              Строка даты
   */
  public static String formatDate(Date date, SimpleDateFormat simDateFormat, String replace) {
    boolean hideZeroTime = false;
    if (date == null)
      return replace;
    if (simDateFormat == null) {
      hideZeroTime = true;
      simDateFormat = dateTimeFormat;
    }
    String s = simDateFormat.format(date);
    if (hideZeroTime && s.endsWith("00:00"))
      s = s.substring(0, s.length() - 6);
    return s;
  }

  /**
   * Форматирование даты
   *
   * @param date          Дата
   * @param format        Формат
   * @return              Строка даты
   */
  public static String formatDate(Date date, String format) {
    SimpleDateFormat simDateFormat = null;
    if (format != null) {
      try {
        simDateFormat = new SimpleDateFormat(format);
      } catch(Exception e) {
        simDateFormat = dateFormat;
      }
    }
    return formatDate(date, simDateFormat, "");
  }

  /**
   * Форматирование даты
   *
   * @param date          Дата
   * @param simDateFormat Формат
   * @return              Строка даты
   */
  public static String formatDate(Date date, SimpleDateFormat simDateFormat) {
    return formatDate(date, simDateFormat, "");
  }

  /**
   * Форматирование даты
   *
   * @param date          Дата
   * @return              Строка даты
   */
  public static String formatDate(Date date) {
    return formatDate(date, null, "");
  }

  /**
   * Получение суммы с тийинами
   *
   * @param summ        Сумма
   * @return            Строка суммы с тийинами
   */
  public static String getSummByTiyin(String summ) {
    if (summ == null || summ.equals(""))
      return summ;
    return Double.toString(Double.parseDouble(summ) * 100.0);
  }

  /**
   * Преобразование строки для javascript
   *
   * @param str         Исходная строка
   * @return            Преобразованная строка
   */
  public static String strForScript(String str) {
    if (str == null)
      return "";
    int len = str.length();
    StringBuffer sb = new StringBuffer(2 * len);
    for (int i = 0; i < len; i++) {
      char ch = str.charAt(i);
      switch (ch) {
      case '"':
        sb.append("\\\"");
        break;
      case '\'':
        sb.append("\\'");
        break;
      case '\n':
        sb.append("\\n");
        break;
      case '\r':
        sb.append("\\r");
        break;
      case '\0':
        sb.append("\\u0000");
        break;
      case '\\':
        sb.append("\\\\");
        break;
      default:
        sb.append(ch);
      }
    }
    return sb.toString();
  }

  /**
   * Преобразование HTML-строки для javascript
   *
   * @param text        Исходная строка
   * @return            Преобразованная строка
   */
  public static String filterSpecHTMLChars(String text) {
    if (text == null)
      return "";
    StringTokenizer st = new StringTokenizer(text, "<>&\"", true);
    StringBuffer sb = new StringBuffer();
    while (st.hasMoreTokens()) {
      String token = st.nextToken();
      if ("<".equals(token))
        sb.append("&lt;");
      else if(">".equals(token))
        sb.append("&gt;");
      else if("&".equals(token))
        sb.append("&amp;");
      else if("\"".equals(token))
        sb.append("&quot;");
      else
        sb.append(token);
    }
    return sb.toString();
  }

  /**
   * Получение сообщения об ошибке
   *
   * @param str         Исходная строка об ошибке
   * @return            Сообщение об ошибке
   */
  public static String getErrMess(String str) {
    try {
      return str.substring(str.indexOf("~") + 1, str.lastIndexOf("~"));
    } catch(Exception e) {
      return str;
    }
  }

  /**
   * Получение сообщения об ошибке для javascript
   *
   * @param str         Исходная строка об ошибке
   * @return            Сообщение об ошибке
   */
  public static String getErrMessForScript(String str) {
    return strForScript(getErrMess(str));
  }

  /**
   * Получение выражения javascript для alert()
   *
   * @param str         Исходная строка
   * @return            Выражение javascript для alert()
   */
  public static String buildAlert(String str) {
    return "alert('" + strForScript(str) + "');";
  }

  /**
   * Получение выражения javascript для alert() об ошибке
   *
   * @param str         Исходная строка об ошибке
   * @return            Выражение javascript для alert()
   */
  public static String buildErrAlert(String str) {
    return "alert('" + getErrMessForScript(str) + "');";
  }

  /**
   * Получение значения с проверкой на null
   *
   * @param str         Исходная строка
   * @param res         Строка при null
   * @return            Строка
   */
  public static String nvl(String str, String res) {
    return (str != null) ? str : res;
  }

  /**
   * Получение строки денежной суммы
   *
   * @param summ        Сумма
   * @param frac        Количество десятичных знаков после точки
   * @param group       Поставить тысячные групповые разделители?
   * @param delim       Групповой разделитель тысяч
   * @return            Строка денежной суммы
   */
  public static String formatCurrency(double summ, int frac, boolean group, char delim) {
    DecimalFormatSymbols dfs = new DecimalFormatSymbols(Locale.US);
    DecimalFormat df = new DecimalFormat();

    if (group) {
      dfs.setGroupingSeparator(delim);
      df.setGroupingSize(3);
    }
    else {
      df.setGroupingSize(0);
    }
    df.setDecimalFormatSymbols(dfs);
    df.setMinimumFractionDigits(frac);
    df.setMaximumFractionDigits(frac > 8 ? frac : 8);
    return df.format(summ);
  }

  /**
   * Получение строки денежной суммы
   *
   * @param summ        Сумма
   * @return            Строка денежной суммы
   */
  public static String formatCurrency(double summ) {
    return currencyFormat.format(summ);
  }

  /**
   * Получение строки из объединённых элементов массива
   *
   * @param array       Массив
   * @param del         Разделитель
   * @return            Строка
   */
  public static String join(Object[] array, String del) {
    if (array == null)
      return "";
    StringBuffer sb = new StringBuffer();
    for (int i = 0, n = array.length; i < n; ++i) {
      sb.append(array[i]);
      sb.append(del);
    }
    return sb.toString();
  }

  /**
   * Получение строки из объединённых элементов массива из чисел
   *
   * @param array       Массив
   * @param del         Разделитель
   * @return            Строка
   */
  public static String join(int[] array, String del) {
    if (array == null)
      return "";
    StringBuffer sb = new StringBuffer();
    for (int i = 0, n = array.length; i < n; ++i) {
      sb.append(array[i]);
      sb.append(del);
    }
    return sb.toString();
  }

  /**
   * Заполнение массива строк из строки
   *
   * @param str         Исходная строка
   * @param del         Разделитель
   * @param array       Выходной массив строк
   */
  public static void split(String str, String del, String[] array) {
    final int size = array.length;
    final int len = str.length();
    int pos = 0, end;

    for (int i = 0; i < size && pos < len; ++i) {
      end = str.indexOf(del, pos);
      if (end == -1) end = len;
      array[i] = str.substring(pos, end);
      pos = end + 1;
    }
  }

  /**
   * Получение массива чисел из строки
   *
   * @param str         Исходная строка
   * @param del         Разделитель
   * @return            Массив строк
   */
  public static int[] splitNumbers(String str, String del) {
    ArrayList array = new ArrayList();
    int[] result;
    int n = 0;

    for (int i = 0, beg = 0, end; (end = str.indexOf(del, beg)) != -1; ++i, ++n) {
      array.add(i, str.substring(beg, end));
      beg = end + 1;
    }
    result = new int[n];
    for (int i = 0; i < n; ++i) {
      result[i] = Integer.parseInt((String) array.get(i));
    }
    return result;
  }

  /**
   * Выдача сообщения на стандартный поток ошибок
   *
   * @param msg       Сообщение
   * @param e         Исключение
   */
  public static void log(String module, String msg, Exception e) {
    System.err.println("[" + Util.formatDate(new java.util.Date(), "dd.MM.yyyy HH:mm:ss:SS") + "] "
        + module + ":\n" + msg);
    if (e != null)
      e.printStackTrace(System.err);
  }

  /**
   * Получить строку стека вызовов
   *
   * @param e         Исключение
   * @return          Строка стека вызовов
   */
  public static String getStackTrace(Exception e) {
    java.io.StringWriter sw = new java.io.StringWriter();
    e.printStackTrace(new java.io.PrintWriter(sw));
    return sw.toString();
  }

  /**
   * Выдача сообщения на стандартный поток ошибок
   *
   * @param msg       Сообщение
   */
  public static void log(String module, String msg) {
    log(module, msg, null);
  }

  /** Hex chars */
  private static final byte[] HEX_CHAR = new byte[] {
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'
  };

  /**
   * Helper function that dump an array of bytes in hex form
   *
   * @param buffer  The bytes array to dump
   * @param length  Number of bytes
   * @return        A string representation of the array of bytes
   */
  public static final String dumpBytes(byte[] buffer, int length) {
    if (buffer == null)
      return "";

    StringBuffer sb = new StringBuffer();

    if (length > buffer.length)
      length = buffer.length;

    for (int i = 0; i < length; i++) {
      sb.append("0x")
        .append((char) (HEX_CHAR[(buffer[i] & 0x00F0) >> 4]))
        .append((char) (HEX_CHAR[buffer[i] & 0x000F]))
        .append(" ");
    }

    return sb.toString();
  }

    public static int Check_Empty_Req(OracleConnection  conn,  String p_user_id, String p_mode) throws SQLException {
            int is_empty = 1;
            OracleCallableStatement stmt_acces = (OracleCallableStatement) conn.prepareCall(
                        "Begin ? := Tl_Requests.is_emty_request(:user_id, :p_mode); End;"
                      );
              stmt_acces.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt_acces.setStringAtName("user_id", p_user_id);
              stmt_acces.setStringAtName("item_id", p_mode );
              stmt_acces.execute();
             is_empty = stmt_acces.getInt(1);

          return is_empty;

    }
    
    /**
     * Validates if input String is a number
     */
    public boolean checkIfNumber(String in) {
        
        try {

            Long.parseLong(in);
        
        } catch (NumberFormatException ex) {
            return false;
        }
        
        return true;
    }


  public static void main(String[] args) {
  }

}
