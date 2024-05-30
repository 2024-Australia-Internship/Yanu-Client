window.onload = () => {
	const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${window.env.KAKAO_MAP_JS_API}&autoload=false`;
   
    script.onload = () => {

      // 스크립트가 로드된 후에 kakao map 호출
    	kakao.maps.load(() => {
			const mapContainer = document.getElementById('map');
			const mapOption = {
				center: new kakao.maps.LatLng(37.4668, 126.9326),
				level: 3
			};

			// 지도 생성
			const map = new kakao.maps.Map(mapContainer, mapOption);
						
			var positions = [
				{
					title: 'Owen\' farm',
					star: 4, 
					farm_id: 1,
					latlng: new kakao.maps.LatLng(33.450705, 126.570677),
					sub_overlay: null
				},
				{
					title: '생태연못', 
					star: 3,
					farm_id: 2,
					latlng: new kakao.maps.LatLng(33.450936, 126.569477),
					sub_overlay: null
				},
				{
					title: '텃밭', 
					star: 1,
					farm_id: 3,
					latlng: new kakao.maps.LatLng(33.450879, 126.569940),
					sub_overlay: null
				},
				{
					title: '근린공원',
					star: 5,
					farm_id: 4,
					latlng: new kakao.maps.LatLng(33.451393, 126.570738),
					sub_overlay: null
				},
				{
					title: 'Owen\'s farm',
					star: 2,
					farm_id: 5,
					latlng: new kakao.maps.LatLng(37.4668, 126.9326),
					sub_overlay: null
				}
			];

			let overlays = {};

			positions.forEach((position, index) => {
				let content = document.createElement('div');
				content.className = "overlay";

				let farmName = document.createElement('div');
				farmName.className = 'farm-name'
				farmName.innerText = position.title;

				let farmInfo = document.createElement('div');
				farmInfo.className = 'farm-info';

				let starBox = document.createElement('div');
				starBox.className = 'star-box';

				let starIcon = document.createElement('iconify-icon');
				starIcon.className = 'star-icon';
				starIcon.icon = 'ph:star-fill';

				let starRating = document.createElement('div');
				starRating.className = 'star-rating';
				starRating.innerText = position.star;

				starBox.appendChild(starIcon);
				starBox.appendChild(starRating);

				let distance = document.createElement('div');
				distance.className = 'distance';
				distance.innerText = '200m';

				farmInfo.appendChild(starBox);
				farmInfo.appendChild(distance);

				content.appendChild(farmName)
				content.appendChild(farmInfo)

				content.onclick = () => {
					console.log('click!')
					clickOverlay(position.title, position.star, position.farm_id, position.latlng, index);
				}

				// 커스텀 오버레이 생성
				var customOverlay  = new kakao.maps.CustomOverlay({
					position: position.latlng,
					content: content
				});
				customOverlay.setMap(map);
			})

			function clickOverlay(title, star, farm_id, latlng, index){
				let key = `overlay${index}`

				console.log(key)
				if(overlays[key]){
					overlays[key].setMap(null);
                    overlays[key] = null;
				}
				else{
					let content = document.createElement('div');
					content.className = 'sub-overlay';
	
					let farmTitle = document.createElement('div');
					farmTitle.className = 'farm-title';
	
					let div = document.createElement('div');
	
					let farmName = document.createElement('div');
					farmName.className = 'farm-name';
					farmName.innerText = title;
	
					let subFarmInfo = document.createElement('div');
					subFarmInfo.className = 'sub-farm-info'
	
					let starBox = document.createElement('star-box');
					starBox.className = 'star-box';
	
					let starIcon = document.createElement('iconify-icon');
					starIcon.className = 'star-icon'
					starIcon.icon = 'ph:star-fill';
	
					let starRating = document.createElement('div');
					starRating.className = 'star-rating';
					starRating.innerText = star;
	
					starBox.appendChild(starIcon);
					starBox.appendChild(starRating);
	
					let distance = document.createElement('div');
					distance.className = 'distance';
					distance.innerText = '200m';
	
					subFarmInfo.appendChild(starBox);
					subFarmInfo.appendChild(distance);
	
					div.appendChild(farmName);
					div.appendChild(subFarmInfo);
	
					let arrowIcon = document.createElement('iconify-icon');
					arrowIcon.className = 'arrow-icon';
					arrowIcon.icon = 'iconamoon:arrow-up-2-thin';
	
					farmTitle.appendChild(div)
					farmTitle.appendChild(arrowIcon)
	
					let farmImgBox = document.createElement('div');
					farmImgBox.className = 'farm-img-box';
	
					let farmImg = document.createElement('img');
					farmImg.className = 'farm-img';
					farmImg.src = '../images/farmer-registration-back-img.svg';
	
					farmImgBox.appendChild(farmImg);
	
					content.appendChild(farmTitle)
					content.appendChild(farmImgBox)
	
					arrowIcon.onclick = () => {
						window.location.href = `/html/farmer-page.html?user_code=9&farm_code=${farm_id}`
					}
				
					var anotherOverlay = new kakao.maps.CustomOverlay({
						content: content,
						map: map,
						position: latlng
					});
				
					anotherOverlay.setMap(map);

					// overlays[key] = anotherOverlay;
					// position.sub_overlay = anotherOverlay;
				}
				
			}
      	});
    };

    // script 태그를 문서에 추가
    document.head.appendChild(script);
}

