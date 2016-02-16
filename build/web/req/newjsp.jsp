<%@ page contentType="text/html;charset=Windows-1251"
  session="false"
  buffer="none"
%>
<html>
<head>
  <script>
    function Open() {
      window.open('req.jsp', '', 'scrollbars=auto,directories=no,location=no,menubar=no,resizable=yes,status=yes,titlebar=yes,toolbar=no,top=0,left=0,width='+(screen.availWidth-10)+',height='+(screen.availHeight-50));
      window.opener = this;
      window.close(self);
    }
  </script>
</head>
<body onload="Open()">
</body></html>