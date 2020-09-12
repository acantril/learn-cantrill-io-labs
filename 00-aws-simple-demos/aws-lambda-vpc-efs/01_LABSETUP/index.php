<html>
<head>
</head><body style="background-color:#1395c0;">
<center><h1>Instance ID : i-070a662ab96cbe8ad</h1></center><br>
<center><img src="cat.gif"></center>
<center><table>
<?php
        $dirname = "images/";
        $images = glob($dirname."*.png");
        $i = 0;
        echo '<tr>';
        foreach($images as $image) {
                if ($i < 3) {
                        echo '<td><center><img src="'.$image.'" width="300"  /></td>';
                        $i++;
                } elseif ($i ==3) {
                        echo '</tr><tr>';
                        $i = 0;
                }
                //echo '<img src="'.$image.'" /><br />';
        }
        echo '</tr>';
?>
</table></center>
</body></html>