

function Controler( logicSquare ) {

	const square = logicSquare;

	const RUNSPEED = 0.03 ;
	const LEAPSPEED = 0.1 ;

	var run = 0 ;
	var leap = 0 ;
	var leapLevel = 0 ;


	function update() {

		if ( run != 0 ) {
			walkRight( run );
		};


		if ( leap > 0 ) {
			leap += LEAPSPEED ;
			leapLevel = Math.sin( leap );
			if ( leap < 1.5 ) {
				leapOffset( 1 - leapLevel );
			} else {
				leapOffset( -1 + leapLevel );
			};
			
			if ( leap > 3 ) leap = 0 ;
		};

	};



	function walkRight( offset ) {
		square.move( offset, 0, 0 );
		// keep the cube from entering a wall
		if ( square.collision.right > 0 ) {
			square.move( - offset, 0, 0 );
		};
	};


	function leapOffset( offset ) {
		square.move( 0, offset * 0.3 , 0 );
		// keep the cube from entering the ground
		if ( square.collision.right > 0 ) {
			square.move( 0, square.collision.right, 0 );
		} else if ( square.collision.left > 0 ) {
			square.move( 0, square.collision.left, 0 );
		};
	};



	document.addEventListener('keydown', (e)=> {

		e.preventDefault();

		switch ( e.key ) {

			case "ArrowRight" :
				if ( run < RUNSPEED ) {
					run = RUNSPEED;
				};
			break;

			case "ArrowLeft" :
				if ( run > -RUNSPEED ) {
					run = -RUNSPEED;
				};
			break;

			case " " :
				if ( leap == 0 ) {
					leap = LEAPSPEED;
				};
			break;
		};

	});




	document.addEventListener('keyup', (e)=> {

		e.preventDefault();

		switch ( e.key ) {

			case "ArrowRight" :
				run = 0;
			break;
			
			case "ArrowLeft" :
				run = 0;
			break;

		};

	});




	return {
		update
	};

};