$(document).ready(function(){
		// Controls Drag + Drop
		$('.cum_portlet_column').sortable(
			{
				//accept: 'portlet',
				//appendTo: 'body',
				//appendTo: '#cum_portlet_container',
				containment: '#cum_portlet_container',
				connectWith: '.cum_portlet_column',
//				helperclass: 'sort_placeholder',
				//forceHelperSize: true ,
				//forcePlaceholderSize: true ,
				//placeholder: '.sort_placeholder',
				helper: 'clone',
				opacity: 0.7,
				tolerance: 'pointer',
//				//fit: 'false',
				stop: function(event, ui){
					//serial = $(this).sortable( 'serialize' );
					//serial = $.serialize();
					var serial1 = $('#cum_portlet_column_1').sortable( 'serialize' );
					var serial2 = $('#cum_portlet_column_2').sortable( 'serialize' );
					var serial = serial1 + '&cum_portlet_div[]=flag&' + serial2
					//alert( serial );
					$.get("home.php?"+serial, function(data){
					    //alert("Data Loaded: " + data);
					  }); 
				}
			}
		);
		
		
		//$('.portlet').corner("12px");  //jquery.corner.js圆角效果
		//$('.portlet_topper').corner("12px top");
});