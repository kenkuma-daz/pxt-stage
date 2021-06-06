namespace stage {

    //% block="foreach $aSprite of $tileImages in tilemap $tilemap"
    //% tilemap.fieldEditor="tilemap"
    //% tilemap.fieldOptions.decompileArgumentAsString="true"
    //% tilemap.fieldOptions.filter="tile"
    //% tilemap.fieldOptions.taggedTemplate="tilemap"
    //% tileImages.shadow="lists_create_with"
    //% draggableParameters="reporter"
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

    //% block="foreach $aSprite of $tileImages in tilemap $tilemap=variables_get(aTilemap)"
    //% tileImages.shadow="lists_create_with"
    //% draggableParameters="reporter"
    //% handlerStatement
    export function setSpriteInTilemap2(tilemap: tiles.TileMapData, tileImages: Image[], handler: (aSprite: Sprite) => void) {
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


    type StageInfo = {
        tilemap: tiles.TileMapData;
        enterAt: tiles.Location;
        exitAt: tiles.Location;
    }

    type onLoadedHandler = (tilemap: tiles.TileMapData) => void;

    class Stage {
        _target: Sprite;
        _index: number = 0;
        _infos : StageInfo[] = [];
        _onLoadedHandler: onLoadedHandler = null;

        constructor() {

        }

        add(info: StageInfo) {
            this._infos.push(info);
        }

        start(target: Sprite) : void {
            if( this._infos.length <= 0 )
                return;

            this._target = target;
            this._index = 0;
            this._show(this._index);
        }
    
        run() {

        }

        forward() {
            this._show(this._index + 1);
        }

        backward() {
            this._show(this._index - 1);
        }

        _show(index : number) : boolean {
            if(index < 0 || this._infos.length <= index )
                return false;

            let info = this._infos[index];
            scene.setTileMapLevel(info.tilemap);
            let next = this._index < index;
            let prev = this._index > index;

            if( this._onLoadedHandler )
                this._onLoadedHandler(info.tilemap);

            return true;
        }

    }

    let _stage = new Stage();
    game.onUpdateInterval(500, function() {
        _stage.run();
    });

    //% block="add $tilemap to stage enter at $enterAt exit at $exitAt"
    //% tilemap.fieldEditor="tilemap"
    //% tilemap.fieldOptions.decompileArgumentAsString="true"
    //% tilemap.fieldOptions.filter="tile"
    //% tilemap.fieldOptions.taggedTemplate="tilemap"
    //% enterAt.shadow="mapgettile"
    //% exitAt.shadow="mapgettile"
    export function addStage(tilemap: tiles.TileMapData, enterAt: tiles.Location, exitAt: tiles.Location) : void {
        _stage.add({tilemap, enterAt, exitAt});
    }

    //% block="on $tilemap=variables_get(aTilemap) loaded"
    //% draggableParameters
    export function onLoaded(handler: (tilemap: tiles.TileMapData) => void) {
        _stage._onLoadedHandler = handler;
    }

    //% block="start stage $target=variables_get(mySprite)"
    export function startStage(target: Sprite) : void {
        _stage.start(target);
    }

}
