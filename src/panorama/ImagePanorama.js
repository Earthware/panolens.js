(function(){
	
	'use strict';
	
	/**
	 * Equirectangular based image panorama
	 * @constructor
	 * @param {string} image - Image url or HTMLImageElement
	 * @param {number} [radius=5000] - Radius of panorama
	 */
	PANOLENS.ImagePanorama = function ( image, radius ) {

		radius = radius || 5000;

		// infospots in IE10 clip with the radius of a imagepanorama's sphere so make it slightly larger
		if(PANOLENS.Utils.checkIsIE10()){
			radius = radius * 1.1;
		}

		var geometry = new THREE.SphereGeometry( radius, 60, 40 ),
			material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true, overdraw: PANOLENS.Utils.checkIsIE10() || false } );

		PANOLENS.Panorama.call( this, geometry, material );

		this.src = image;

	}

	PANOLENS.ImagePanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.ImagePanorama.prototype.constructor = PANOLENS.ImagePanorama;

	/**
	 * Load image asset
	 * @param  {*} src - Url or image element
	 */
	PANOLENS.ImagePanorama.prototype.load = function ( src ) {

		src = src || this.src;

		if ( !src ) { 

			console.warn( 'Image source undefined' );

			return; 

		} else if ( typeof src === 'string' ) {

			PANOLENS.Utils.TextureLoader.load( src, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );

		} else if ( src instanceof HTMLImageElement ) {

			this.onLoad( new THREE.Texture( src ) );

		}

	};

	/**
	 * This will be called when image is loaded
	 * @param  {THREE.Texture} texture - Texture to be updated
	 */
	PANOLENS.ImagePanorama.prototype.onLoad = function ( texture ) {

		texture.minFilter = texture.magFilter = THREE.LinearFilter;

		texture.needsUpdate = true;

		this.updateTexture( texture );

		// Call onLoad after second frame being painted
		window.requestAnimationFrame(function(){

			window.requestAnimationFrame(function(){

				PANOLENS.Panorama.prototype.onLoad.call( this );
				

			}.bind(this));

		}.bind(this));

		

	};

	PANOLENS.ImagePanorama.prototype.reset = function () {

		PANOLENS.Panorama.prototype.reset.call( this );

	};

})();