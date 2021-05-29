namespace stage {

    //% block="foreach $aSprite of $tileImages in tilemap $tilemap"
    //% tilemap.fieldEditor="tilemap"
    //% tilemap.fieldOptions.decompileArgumentAsString="true"
    //% tilemap.fieldOptions.filter="tile"
    //% tilemap.fieldOptions.taggedTemplate="tilemap"
    //% tileImages.shadow="lists_create_with"
    //% draggableParameters
    //% handlerStatement
    export function setSpriteInTilemap(tilemap: tiles.TileMapData, tileImages: Image[], handler: (aSprite: Sprite) => void) {
        scene.setTileMapLevel(tilemap);
        for (let tileImage of tileImages) {
            for (let tileLocation of tiles.getTilesByType(tileImage)) {
                tiles.setTileAt(tileLocation, image.create(16, 16));
                let _sprite = sprites.create(tileImage, SpriteKind.Enemy);
                tiles.placeOnTile(_sprite, tileLocation);
                handler(_sprite);
            }
        }
    }    
}