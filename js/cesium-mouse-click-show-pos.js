////////////////////////////////////////////////////////////////////////////////////////////
//
// Cesium mouse click show position 
//
////////////////////////////////////////////////////////////////////////////////////////////

(function () {
  var self = this;
  function _cartographicToString(cartographic) {
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
    var heightString = cartographic.height.toFixed(2);
    var lhtext = `Lat: ${latitudeString.slice(-8)}, Lon: ${longitudeString.slice(-8)}, Alt: ${heightString.slice(-7)}`;
    return lhtext;
  }

  function setup(_viewer) {
    var handler;
    handler = new Cesium.ScreenSpaceEventHandler(_viewer.scene.canvas);
    handler.setInputAction(function (event) {
      const pickedObject = _viewer.scene.pick(event.position);
      if (Cesium.defined(pickedObject) && _viewer.scene.pickPositionSupported) {
        const cartesian = _viewer.scene.pickPosition(event.position);
        const cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian);
        console.log(`scene.pick(): ${_cartographicToString(cartographic)}`);
      } else {
        var ray = _viewer.camera.getPickRay(event.position);
        var mousePosition = _viewer.scene.globe.pick(ray, _viewer.scene);
        if (Cesium.defined(mousePosition)) {
          var cartographic = Cesium.Cartographic.fromCartesian(mousePosition);
          console.log(`globe.pick(): ${_cartographicToString(cartographic)}`);
        } else {
          console.error(`No position returned`);
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    console.log("!! Cesium.MouseClickShowPos.setup() is finished");
  }

  Cesium.MouseClickShowPos = {}
  Cesium.MouseClickShowPos.setup = setup;
})();
