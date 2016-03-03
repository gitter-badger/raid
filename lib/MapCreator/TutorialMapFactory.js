var Map = require('../Map');
var Direction = require('../GameObjects/Direction');
var MapLocation = require('../GameObjects/MapLocation');
var UnitType = require('../UnitType');

function TutorialMapFactory() {

}

function createOpenSmallMap() {
    var height, width, start, exit, map, roundLimit, ratLoc, i, j, x, y;
    // open small map
    height = 5;
    width = 10;
    start = new MapLocation(1, 1);
    exit = new MapLocation(width - 2, height - 2);
    roundLimit = 50;
    map = new Map(height, width, start, exit, roundLimit);
    map.createWallBorder();
    map.cleanUp();
    return map;
}

function createSmallMapWithRubble() {
    var height, width, start, exit, map, roundLimit, ratLoc, i, j, x, y;
    // small map with rubble
    height = 9;
    width = 15;
    start = new MapLocation(1, height - 2);
    exit = new MapLocation(width - 2, 1);
    roundLimit = 100;
    map = new Map(height, width, start, exit, roundLimit);
    map.createWallBorder();
    map.createWall(start.add(start.directionTo(exit).rotateLeft(), 2 + Math.floor(Math.random() * 2)));
    map.createWall(start.add(start.directionTo(exit).rotateRight(), 2 + Math.floor(Math.random() * 2)));
    map.createWall(exit.add(exit.directionTo(start).rotateLeft(), 2 + Math.floor(Math.random() * 2)));
    map.createWall(exit.add(exit.directionTo(start).rotateRight(), 2 + Math.floor(Math.random() * 2)));
    for (i = -3; i <= 1; i++) {
        for (j = -3; j <= 1; j++) {
            //create a jagged edge look
            if (i === -3 || i === 1 && Math.random() < .15) {
                continue;
            }
            if (j === -3 || j === 1 && Math.random() < .15) {
                continue;
            }
            map.createWall(new MapLocation(
                Math.round(width/2) + i,
                Math.round(height/2) + j
            ));
        }
    }
    map.cleanUp();
    return map;
}

function createOneRatMap() {
    var height, width, start, exit, map, roundLimit, ratLoc, i, j, x, y;
    // rubble and a rat!
    height = 10;
    width = 15;
    start = new MapLocation(width - 2, height - 2);
    exit = new MapLocation(1, 1);
    roundLimit = 100;
    map = new Map(height, width, start, exit, roundLimit);
    map.createWallBorder();

    i = 0;
    while (i < 10 + Math.random() * 10) {
        x = Math.round(width/2 + (Math.random() -.5) * width/2);
        y = Math.round(height/2 + (Math.random() -.5) * height/2);
        if ((x + y) % 2 === 0) {
            continue;
        }
        loc = new MapLocation(x, y);
        if (map.isWall(loc)) {
            continue;
        }
        i++;
        map.createWall(loc);
    }
    ratLoc = new MapLocation(Math.round(width/2), Math.round(height/2));
    map.clearLoc(ratLoc);
    map.addToSpawnList(UnitType.RAT, ratLoc);
    map.cleanUp();
    return map;
}

function createRatNestMap() {
    var height, width, start, exit, map, roundLimit, ratLoc, i, j, x, y;
    // enough rats that you can't just run by them
    height = 15;
    width = 21;
    start = new MapLocation(width - 2, height - 2);
    exit = new MapLocation(1, 1);
    roundLimit = 150;
    map = new Map(height, width, start, exit, roundLimit);
    map.createWallBorder();

    i = 0;
    while (i < 80) {
        x = Math.round(width/2 + (Math.random() -.5) * width);
        y = Math.round(height/2 + (Math.random() -.5) * height);
        // only every other row
        if (x % 2 === 0) {
            continue;
        }
        // make sure you can still get to the exit!
        if (y <= 1 || y === Math.round(height/2) || y >= height - 2) {
            continue;
        }
        loc = new MapLocation(x, y);
        if (map.isWall(loc)) {
            continue;
        }
        i++;
        map.createWall(loc);
    }
    // enough rats so they can't just run through the level
    ratLoc = new MapLocation(Math.round(width/2), Math.round(height/2));
    map.clearLoc(ratLoc);
    map.addToSpawnList(UnitType.RAT, ratLoc);

    map.clearLoc(ratLoc.add(ratLoc.directionTo(start), 4));
    map.addToSpawnList(UnitType.RAT, ratLoc.add(ratLoc.directionTo(start), 4));

    ratLoc = exit.add(exit.directionTo(start));
    map.clearLoc(ratLoc);
    map.addToSpawnList(UnitType.RAT, ratLoc);

    ratLoc = exit.add(exit.directionTo(start).rotateLeft());
    map.clearLoc(ratLoc);
    map.addToSpawnList(UnitType.RAT, ratLoc);

    map.cleanUp();
    return map;
}

function createGnatSwarm() {
    var height, width, start, exit, map, roundLimit, ratLoc, i, j, x, y;
    // enough rats that you can't just run by them
    height = 16;
    width = 21;
    start = new MapLocation(1, 1);
    exit = new MapLocation(width - 2, height - 2);
    roundLimit = 150;
    map = new Map(height, width, start, exit, roundLimit);
    map.createWallBorder();

    var middle = new MapLocation(Math.round(width/2), Math.round(height/2));
    map.createWalls(middle.add(Direction.NORTH_WEST, 2), middle.add(Direction.SOUTH_EAST));

    map.addToSpawnList(UnitType.GNAT, middle.add(Direction.WEST, 8));
    map.addToSpawnList(UnitType.GNAT, middle.add(Direction.NORTH, 4));
    map.addToSpawnList(UnitType.GNAT, exit.add(Direction.NORTH));
    map.addToSpawnList(UnitType.GNAT, exit.add(Direction.NORTH, 2));
    map.addToSpawnList(UnitType.GNAT, exit.add(Direction.NORTH, 2).add(Direction.WEST));
    map.addToSpawnList(UnitType.GNAT, exit.add(Direction.NORTH, 3));
    map.addToSpawnList(UnitType.GNAT, exit.add(Direction.NORTH_WEST));
    map.addToSpawnList(UnitType.GNAT, exit.add(Direction.WEST));
    map.addToSpawnList(UnitType.GNAT, exit.add(Direction.WEST, 2));
    map.addToSpawnList(UnitType.GNAT, exit.add(Direction.WEST, 2).add(Direction.NORTH));
    map.addToSpawnList(UnitType.GNAT, exit.add(Direction.WEST, 3));

    return map;
}

function createQuillBoarBox() {
    var height, width, start, exit, map, roundLimit, ratLoc, i, j, x, y;
    // enough rats that you can't just run by them
    height = 13;
    width = 17;
    start = new MapLocation(1, 1);
    exit = new MapLocation(width - 2, height - 2);
    roundLimit = 150;
    map = new Map(height, width, start, exit, roundLimit);
    map.createWallBorder();

    var middle = new MapLocation(Math.round(width/2), Math.round(height/2));
    map.createWalls(middle.add(Direction.NORTH_WEST, 2), middle.add(Direction.SOUTH_WEST, 2));
    map.createWalls(middle.add(Direction.NORTH_WEST, 2), middle.add(Direction.NORTH_EAST, 2));
    map.createWalls(middle.add(Direction.SOUTH_EAST, 2), middle.add(Direction.NORTH_EAST, 2));
    map.createWalls(middle.add(Direction.SOUTH_EAST, 2), middle.add(Direction.SOUTH_WEST, 2));

    map.addToSpawnList(UnitType.QUILL_BOAR, middle);

    return map;

}

function createNecroBossMap() {
    var height, width, start, exit, map, roundLimit, ratLoc, i, j, x, y;
    // enough rats that you can't just run by them
    height = 16;
    width = 21;
    start = new MapLocation(1, 1);
    exit = new MapLocation(width - 2, height - 2);
    roundLimit = 500;
    map = new Map(height, width, start, exit, roundLimit);
    map.createWallBorder();

    var middle = new MapLocation(Math.round(width/2), Math.round(height/2));
    map.addToSpawnList(UnitType.NECROMANCER, middle);

    return map;
}

function createLegalMap(mapCreationFunction) {
    i = 0;
    do {
        map = mapCreationFunction();
        i++;
    } while (!map.isLegal() && i < 10);
    if (i == 10) {
        throw Error("Error generating legal map!");
    }
    return map;
}

// static functions
TutorialMapFactory.createTutorialMap = function(level) {
    switch(level) {
        case 1:
            return createLegalMap(createOpenSmallMap);
        case 2:
            return createLegalMap(createSmallMapWithRubble);
        case 3:
            return createLegalMap(createOneRatMap);
        case 4:
            return createLegalMap(createRatNestMap);
        case 5:
            return createLegalMap(createGnatSwarm);
        case 6:
            return createLegalMap(createQuillBoarBox);
        case 7:
            return createLegalMap(createNecroBossMap);

        default:
            return createLegalMap(createNecroBossMap);
    }
};

module.exports = TutorialMapFactory;