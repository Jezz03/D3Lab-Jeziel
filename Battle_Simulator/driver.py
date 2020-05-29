
from terrain.terrain_type import *
from characters.soldier import Soldier
from characters.jedi import Jedi
from characters.clan import Clan
from army.army import Army
from map.map import Map
from map.field import *
from characters.character_type import CharacterType
from army.army_deploy import ArmyDeploy

m = Map(400, 400)
m.assign_type(TerrainType.FOREST)
# print(m)

rDeploy = ArmyDeploy.HORIZONTAL
bDeploy = ArmyDeploy.TRIANGLE
rSize = 900
bSize = 800
a = Army(Clan.BLUE)
a.army_type = CharacterType.SOLDIER
# a.deploy = ArmyDeploy.HORIZONTAL
a.deploy = rDeploy
a.createArmy(bSize)

b = Army(Clan.RED)
b.army_type = CharacterType.JEDI_KNIGHT
b.deploy = bDeploy
b.createArmy(rSize)

launch(m, a, b)
