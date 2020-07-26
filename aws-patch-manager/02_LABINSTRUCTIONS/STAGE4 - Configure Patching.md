# Systems Manager - Advanced Demo 

Welcome to `STAGE4` of this Advanced Demo where you will gain practical experience using Systems Manager
You will perform the following tasks:-  

- Provision the environments 
- Setup AWS Managed Instances
- Setup On-Prem Managed instances
- Configure Patching  <== THIS STAGE  
- Verify Patching

# Configure Inventory

Go to the systems manager console
Clic Inventory under `Instances and Nodes`
Click `Setup Inventory`
For Name `A4L-INVENTORY`
Select `Selecting all managed instances in this account`
Schedule `Collected inventory data every 30 minutes`
you could log to an S3 bucet, but were going to just click `Setup Inventory`

Click `View Details`
This creates an association ... running the job `AWS-GatherSoftwareInventory` on all managed instances every 30 minutes
Click `Resources` tab ad you can see it as it runs on all managed instances

for one which shows `success` click `view output`
See execution summary ...
Click the `X`

Click on `Inventory` again under `instances and nodes`
Scroll down
Click one of the Instances
Click on the `Inventory` tab ... information is now starting to populate from managed instances



# STAGE 4A - CONFIGURE PATCHING CENTOS

Open https://console.aws.amazon.com/systems-manager/home?region=us-east-1
Click `Patch Manager`
Click `Configure Patching`
Select `Select instances manually`
Select Both Centos Instances
Scroll Down to Patching Schedule
At this stage you could define a schedule ... select `Schedule in a new Maintenance Window`
and configure start times and dates, window duration... and that would be used every time
Check `Use a CRON schedule builder`
Check `Every 30 minutes`
for Maintanance window name pick `Centos-every-30-mins`
Select `Scan and install`
Expand `Additional Settings`

read this text at the bottom
`If any instance you selected belongs to a patch group, Patch Manager patches your instances using the registered patch baseline of that patch group. If an instance is not configured to use a patch group, Patch Manager uses the default patch baseline for the operating system type of the instance.` - thats why we 

Click `Configure Patching`
Click `View Details`

# STAGE 4B - CONFIGURE PATCHING UBUNTU

Click `Patch Manager`
Click `Configure Patching`
Select `Select instances manually`
Select Both Ubuntu Instances
Scroll Down to Patching Schedule
At this stage you could define a schedule ... select `Schedule in a new Maintenance Window`
and configure start times and dates, window duration... and that would be used every time
Check `Use a CRON schedule builder`
Check `Every 30 minutes`
for Maintanance window name pick `Ubuntu-every-30-mins`
Select `Scan and install`
Expand `Additional Settings`

read this text at the bottom
`If any instance you selected belongs to a patch group, Patch Manager patches your instances using the registered patch baseline of that patch group. If an instance is not configured to use a patch group, Patch Manager uses the default patch baseline for the operating system type of the instance.` - thats why we 

Click `Configure Patching`
Click `View Details`


# STAGE 4C - CONFIGURE PATCHING WIN

Click `Patch Manager`
Click `Configure Patching`
Select `Select instances manually`
Select Both Win Instances
Scroll Down to Patching Schedule
At this stage you could define a schedule ... select `Schedule in a new Maintenance Window`
and configure start times and dates, window duration... and that would be used every time
Check `Use a CRON schedule builder`
Check `Every 30 minutes`
for Maintanance window name pick `Win-every-30-mins`
Select `Scan and install`
Expand `Additional Settings`

read this text at the bottom
`If any instance you selected belongs to a patch group, Patch Manager patches your instances using the registered patch baseline of that patch group. If an instance is not configured to use a patch group, Patch Manager uses the default patch baseline for the operating system type of the instance.` - thats why we 

Click `Configure Patching`
Click `View Details`


# STAGE 4 - FINISH

At this point ...3 maintanance windows have been created, each of which will run every 30 minutes and patch those machines, rebooting as required.
In stage 5... you will verify what has been patched and then perform cleanup of the account to remove all demo tasks






