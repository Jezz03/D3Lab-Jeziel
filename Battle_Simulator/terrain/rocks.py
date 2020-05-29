from terrain.terrain import Terrain


class Rocks(Terrain):

    def __init__(self, x: int, y: int):
        super().__init__(x, y)
        self._factor = 0.75

    def __str__(self):
        return "Rocks: " + super().__str__()
