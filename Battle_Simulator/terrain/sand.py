from terrain.terrain import Terrain


class Sand(Terrain):

    def __init__(self, x: int, y: int):
        super().__init__(x, y)
        self._factor = 0.5

    def __str__(self):
        return "Ice: " + super().__str__()
