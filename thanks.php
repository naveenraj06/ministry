<?php

// Turn off all error reporting
error_reporting(0);
?>
<?php 
$name = $_POST['username'];  
$email = $_POST['mail'];
$phone = $_POST['phone']; 
// $captchaVal = $_POST['captcha'];
// $captcha = $_POST['captcha_text'];
$mesg = $_POST['message'];
  if(($_POST['name']!= '')&&($_POST['phone']!= '')&&($_POST['email']!= '')){
//$today = date("Y-m-d h:i:s");
//$str="INSERT INTO `dbs_careers` ( `name`, `email`, `phone`, `serv`, `uploads`, `msg`, `CreatedDate`) VALUES (  '".addslashes($name)."', '".addslashes($email)."',  '".addslashes($phone)."', '".addslashes($serv)."', '".addslashes($newf)."', '".addslashes($message)."', '".addslashes($today)."')";

	//$db->insert($str);

	
$subject = 'இயேசுவின் நற்செய்தி உழியம் :: Contact Us';

$message = '<table width="500"  border="0" cellpadding="3" cellspacing="0" bordercolor="#5a58bc" bgcolor="#ffffff" style="border: solid 1px #5a58bc">
<tr>
  <td><table width="500" height="" border="0" cellpadding="5" cellspacing="0">
    <tr>
      <td height="24" colspan="3" valign="top" style="background:#DFB300" ><font face="Arial, Helvetica, sans-serif" size="4" color="#FFFFFF"><strong>இயேசுவின் நற்செய்தி உழியம் - Contact Enquiry</strong></font></td>
    </tr>
    
    <tr>
      <td width="40%" height="24" valign="top" bgcolor="#f4f4f4"><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e"><b>Name</b></font></td>
      <td width="10%" valign="top"><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e">:</font>  </td>
      <td width="50%" valign="top" ><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e">'.$name.'</font>        </td>
    </tr>
     
    <tr>
      <td width="40%" height="24" valign="top" bgcolor="#f4f4f4"><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e"><b>Email</b></font></td>
      <td width="10%" valign="top"><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e">:</font>  </td>
      <td width="50%" valign="top" ><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e">'.$email.'</font>        </td>
    </tr>
    
     <tr>
      <td width="40%" height="24" valign="top" bgcolor="#f4f4f4"><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e"><b>Phone</b></font></td>
      <td width="10%" valign="top"><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e">:</font>  </td>
      <td width="50%" valign="top" ><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e">'.$phone.'</font>        </td>
    </tr>

     
      <td height="24" valign="top" bgcolor="#f4f4f4"><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e"><b>Message</b></font></td>
      <td valign="top"><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e">:</font> </td>
      <td valign="top" ><font face="Arial, Helvetica, sans-serif" size="2" color="#2e2e2e">'.$mesg.'</font></td>
    </tr>
      </table></td>
</tr>
</table>';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers .= 'From:'.$email. "\r\n";
$headers .= 'Bcc: naveenrajiv.06@gmail.com' . "\r\n";



 
$to  = 'naveenrajiv.06@gmail.com';


if(mail($to, $subject, $message, $headers)){

        // the echo goes back to the ajax, so the user can know if everything is ok
        //echo "ok";
		 
		 echo json_encode(array("rslt"=>"1")); //success
		
    } else {
         echo json_encode(array("rslt"=>"0")); //success
    }
	
  }
?>             
                  
                  
                  
                  
                  
                  
            