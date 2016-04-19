City Runner - Notes
===================

Useful notes/commands for development.

Marker ArmorStands
------------------

### START POINTS
Create ArmorStands to mark the location of all potential start points.

`/summon ArmorStand ~ ~ ~ {NoGravity:true,Marker:true,Invisible:true,CustomName:"cr_start_point"}`

OR 

`/give @p minecraft:armor_stand ~ ~ ~ {EntityTag:{CustomName:"cr_start_point",Marker:1b,Invulnerable:1b,NoGravity:1b,Invisible:1b}}`

Create ArmorStands to mark all the potential spawn locations near start point (there can be as many or as few as you want).

`/summon ArmorStand ~ ~ ~ {NoGravity:true,Marker:true,Invisible:true,CustomName:"cr_start_spawn"}`

`/give @p minecraft:armor_stand ~ ~ ~ {EntityTag:{CustomName:"cr_start_spawn",Marker:1b,Invulnerable:1b,NoGravity:1b,Invisible:1b}}`

To start/stop showing all existing start points:

`/scoreboard players tag @e[name=SYSTEM] add loop_ShowStartPoints`

`/scoreboard players tag @e[name=SYSTEM] remove loop_ShowStartPoints`

### FINISH POINTS

Create ArmorStands to mark the location of all potential finish points.

Place where the beacon should go. Beacon will be removed and placed to turn on and off.

`/summon ArmorStand ~ ~ ~ {NoGravity:true,Marker:true,Invisible:true,CustomName:"cr_finish_point"}`

`/give @p minecraft:armor_stand 1 0 {EntityTag:{CustomName:"cr_finish_point",Marker:1b,Invulnerable:1b,NoGravity:1b,Invisible:1b}}`

To start/stop showing all existing finish points:

`/scoreboard players tag @e[name=SYSTEM] add loop_ShowFinishPoints`

`/scoreboard players tag @e[name=SYSTEM] remove loop_ShowFinishPoints`

### AREA NAMES
Use these ArmorStands to give areas a name, so that the game can announce names to be helpful

`
/summon ArmorStand ~ ~ ~ {NoGravity:true,Marker:true,Invisible:true,CustomNameVisible:true,CustomName:"ENTER AREA NAME"}
`

Then run this to register as an Area Name.

`/scoreboard players set @e[type=ArmorStand,r=0] area_names 1`

### OTHERS

SHOW START POINTS: `/entitydata @e[name=cr_start_point] {Invisible:false}`

HIDE START POINTS: `/entitydata @e[name=cr_start_point] {Invisible:true}`

SHOW SPAWN POINTS: `/entitydata @e[name=cr_start_spawn] {Invisible:false}`

HIDE SPAWN POINTS: `/entitydata @e[name=cr_start_spawn] {Invisible:true}`

SHOW FINISH POINTS: `/entitydata @e[name=cr_finish_point] {Invisible:false}`

HIDE FINISH POINTS: `/entitydata @e[name=cr_finish_point] {Invisible:true}`

Scoreboards to replace
----------------------

Scoreboards that need replacing with tags because they are being used to tag entities

### AREAS

We're using this scoreboard to keep track of Marker ArmorStands that are used for AREA NAMES

`/scoreboard objectives add area_names dummy AREA NAMES`



