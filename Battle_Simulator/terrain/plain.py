from terrain.terrain import Terrain


class Plain(Terrain):

    def __init__(self, x: int, y: int):
        super().__init__(x, y)
        self._factor = 1

    def __str__(self):
        return "Plain: " + super().__str__()
