# Systems Manager - Advanced Demo 

Welcome to `STAGE5` of this Advanced Demo where you will gain practical experience using Systems Manager   
You will perform the following tasks:-    

- Provision the environments     
- Setup AWS Managed Instances  
- Setup On-Prem Managed instances  
- Configure Patching  
- Verify Patching <== THIS STAGE   

# STAGE 5A - VERIFY PATCHING  

Wait for one of the maintanance windows to finish  
Open the maintanamce windows console  
https://console.aws.amazon.com/systems-manager/maintenance-windows/?region=us-east-1  

Click the `Windows` window  
Check `Next execution time`  
Wait for that time _note that its in UTC_  

Click on the `History` tab  
Select the item in history  
CLick `View Details`  
Select the Task Invocation ... click `view details`  
Pick one of the instanceID's, select it, click `view output`  
Expand output ....  
Verify that the process is working as expected  


# STAGE 5B - CLEANUP  

Delete the maintanance windows  
Open `Maintanance WIndows` https://console.aws.amazon.com/systems-manager/maintenance-windows?region=us-east-1  
select each, and delete  

Click `State Manager` , chec the `A4L-INVENTORY` associaton, click `Delete` and `Delete again`  

Click `Hybrid Actvations`, selecet it, Click `Delete`, Click `Delete Activations`  

open `Managed Instances` https://console.aws.amazon.com/systems-manager/managed-instances?region=us-east-1  
Select each of the items starting with `mi-` clcik actions => `Deregister this managed instances`, then `Deregister`  


Open CloudFormation  
https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false  
Select SSMVPCE stack, Click `Delete`, then `Delete Stack`   
Wait for this to finish deleting  
Select SSMBASE stack, Click `Delete`, then `Delete Stack`  




