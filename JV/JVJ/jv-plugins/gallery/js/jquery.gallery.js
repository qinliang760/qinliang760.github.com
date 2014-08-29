/*
 * gallery
 *
 * Copyright (c) 2014 Jay
 * Licensed under the MIT license.
 */

(function($){
    /**
     * 
     * @class gallery
     * @constructor
     */
    JV.gallery = function(Jnode, cfg) {
        var self = this;
        var defaults = {
            data:{
                galleryType:"images",
                dataKey:"fanart",
                viewType:"film-strip",
                indices:['fanart-0209','fanart-0208','fanart-0207','fanart-0192','fanart-0206','fanart-0205','fanart-0204','fanart-0203','fanart-0202','fanart-0201','fanart-0200','fanart-0199','fanart-0198','fanart-0197','fanart-0196','fanart-0195','fanart-0194','fanart-0193','fanart-0191','fanart-0190','fanart-0189','fanart-0188','fanart-0187','fanart-0186','fanart-0185','fanart-0184','fanart-0183','fanart-0182','fanart-0181','fanart-0180','fanart-0179','fanart-0178','fanart-0177','fanart-0176','fanart-0175','fanart-0174','fanart-0173','fanart-0172','fanart-0171','fanart-0170','fanart-0169','fanart-0168','fanart-0167','fanart-0166','fanart-0165','fanart-0164','fanart-0163','fanart-0162','fanart-0161','fanart-0160','fanart-0159','fanart-0158','fanart-0157','fanart-0156','fanart-0155','fanart-0154','fanart-0153','fanart-0152','fanart-0151','fanart-0150','fanart-0149','fanart-0148','fanart-0147','fanart-0146','fanart-0145','fanart-0144','fanart-0143','fanart-0142','fanart-0141','fanart-0140','fanart-0139','fanart-0138','fanart-0137','fanart-0136','fanart-0135','fanart-0134','fanart-0133','fanart-0132','fanart-0131','fanart-0130','fanart-0129','fanart-0128','fanart-0127','fanart-0126','fanart-0125','fanart-0124','fanart-0123','fanart-0122','fanart-0121','fanart-0120','fanart-0119','fanart-0118','fanart-0117','fanart-0116','fanart-0115','fanart-0114','fanart-0113','fanart-0112','fanart-0111','fanart-0110','fanart-0109','fanart-0108','fanart-0107','fanart-0106','fanart-0105','fanart-0104','fanart-0103','fanart-0102','fanart-0101','fanart-0100','fanart-0099','fanart-0098','fanart-0097','fanart-0096','fanart-0095','fanart-0094','fanart-0093','fanart-0092','fanart-0091','fanart-0090','fanart-0089','fanart-0088','fanart-0087','fanart-0086','fanart-0085','fanart-0084','fanart-0083','fanart-0082','fanart-0081','fanart-0080','fanart-0079','fanart-0078','fanart-0077','fanart-0076','fanart-0075','fanart-0074','fanart-0073','fanart-0072','fanart-0071','fanart-0070','fanart-0069','fanart-0068','fanart-0067','fanart-0066','fanart-0065','fanart-0064','fanart-0063','fanart-0062','fanart-0061','fanart-0060','fanart-0059','fanart-0058','fanart-0057','fanart-0056','fanart-0055','fanart-0054','fanart-0053','fanart-0052','fanart-0051','fanart-0050','fanart-0049','fanart-0048','fanart-0047','fanart-0046','fanart-0045','fanart-0044','fanart-0043','fanart-0042','fanart-0041','fanart-0040','fanart-0039','fanart-0038','fanart-0037','fanart-0036','fanart-0035','fanart-0034','fanart-0033','fanart-0032','fanart-0031','fanart-0030','fanart-0029','fanart-0028','fanart-0027','fanart-0026','fanart-0025','fanart-0024','fanart-0023','fanart-0022','fanart-0021','fanart-0020','fanart-0019','fanart-0018','fanart-0017','fanart-0016','fanart-0015','fanart-0014','fanart-0013','fanart-0012','fanart-0011','fanart-0010','fanart-0009','fanart-0008','fanart-0007','fanart-0006','fanart-0005','fanart-0004','fanart-0003','fanart-0002','fanart-0001'],
                itemPaths:[{'fanart-0209':'http://nos.netease.com/sc2/2/media/wallpapers/Halloween-small-104.jpg'},{'fanart-0208':'http://blzimg.126.net/vrVu6N4F_Wj9DI0W5n5UXA==/16492674418766'},{'fanart-0207':'http://blzimg.126.net/nmigXn26tGpKP9qTkR6OZQ==/16492674418765'},{'fanart-0192':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0192-small.jpg'},{'fanart-0206':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0206-small.jpg'},{'fanart-0205':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0205-small.jpg'},{'fanart-0204':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0204-small.jpg'},{'fanart-0203':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0203-small.jpg'},{'fanart-0202':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0202-small.jpg'},{'fanart-0201':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0201-small.jpg'},{'fanart-0200':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0200-small.jpg'},{'fanart-0199':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0199-small.jpg'},{'fanart-0198':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0198-small.jpg'},{'fanart-0197':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0197-small.jpg'},{'fanart-0196':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0196-small.jpg'},{'fanart-0195':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0195-small.jpg'},{'fanart-0194':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0194-small.jpg'},{'fanart-0193':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0193-small.jpg'},{'fanart-0191':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0191-small.jpg'},{'fanart-0190':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0190-small.jpg'},{'fanart-0189':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0189-small.jpg'},{'fanart-0188':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0188-small.jpg'},{'fanart-0187':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0187-small.jpg'},{'fanart-0186':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0186-small.jpg'},{'fanart-0185':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0185-small.jpg'},{'fanart-0184':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0184-small.jpg'},{'fanart-0183':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0183-small.jpg'},{'fanart-0182':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0182-small.jpg'},{'fanart-0181':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0181-small.jpg'},{'fanart-0180':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0180-small.jpg'},{'fanart-0179':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0179-small.jpg'},{'fanart-0178':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0178-small.jpg'},{'fanart-0177':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0177-small.jpg'},{'fanart-0176':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0176-small.jpg'},{'fanart-0175':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0175-small.jpg'},{'fanart-0174':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0174-small.jpg'},{'fanart-0173':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0173-small.jpg'},{'fanart-0172':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0172-small.jpg'},{'fanart-0171':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0171-small.jpg'},{'fanart-0170':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0170-small.jpg'},{'fanart-0169':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0169-small.jpg'},{'fanart-0168':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0168-small.jpg'},{'fanart-0167':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0167-small.jpg'},{'fanart-0166':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0166-small.jpg'},{'fanart-0165':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0165-small.jpg'},{'fanart-0164':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0164-small.jpg'},{'fanart-0163':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0163-small.jpg'},{'fanart-0162':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0162-small.jpg'},{'fanart-0161':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0161-small.jpg'},{'fanart-0160':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0160-small.jpg'},{'fanart-0159':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0159-small.jpg'},{'fanart-0158':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0158-small.jpg'},{'fanart-0157':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0157-small.jpg'},{'fanart-0156':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0156-small.jpg'},{'fanart-0155':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0155-small.jpg'},{'fanart-0154':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0154-small.jpg'},{'fanart-0153':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0153-small.jpg'},{'fanart-0152':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0152-small.jpg'},{'fanart-0151':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0151-small.jpg'},{'fanart-0150':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0150-small.jpg'},{'fanart-0149':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0149-small.jpg'},{'fanart-0148':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0148-small.jpg'},{'fanart-0147':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0147-small.jpg'},{'fanart-0146':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0146-small.jpg'},{'fanart-0145':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0145-small.jpg'},{'fanart-0144':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0144-small.jpg'},{'fanart-0143':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0143-small.jpg'},{'fanart-0142':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0142-small.jpg'},{'fanart-0141':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0141-small.jpg'},{'fanart-0140':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0140-small.jpg'},{'fanart-0139':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0139-small.jpg'},{'fanart-0138':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0138-small.jpg'},{'fanart-0137':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0137-small.jpg'},{'fanart-0136':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0136-small.jpg'},{'fanart-0135':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0135-small.jpg'},{'fanart-0134':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0134-small.jpg'},{'fanart-0133':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0133-small.jpg'},{'fanart-0132':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0132-small.jpg'},{'fanart-0131':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0131-small.jpg'},{'fanart-0130':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0130-small.jpg'},{'fanart-0129':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0129-small.jpg'},{'fanart-0128':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0128-small.jpg'},{'fanart-0127':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0127-small.jpg'},{'fanart-0126':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0126-small.jpg'},{'fanart-0125':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0125-small.jpg'},{'fanart-0124':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0124-small.jpg'},{'fanart-0123':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0123-small.jpg'},{'fanart-0122':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0122-small.jpg'},{'fanart-0121':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0121-small.jpg'},{'fanart-0120':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0120-small.jpg'},{'fanart-0119':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0119-small.jpg'},{'fanart-0118':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0118-small.jpg'},{'fanart-0117':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0117-small.jpg'},{'fanart-0116':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0116-small.jpg'},{'fanart-0115':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0115-small.jpg'},{'fanart-0114':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0114-small.jpg'},{'fanart-0113':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0113-small.jpg'},{'fanart-0112':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0112-small.jpg'},{'fanart-0111':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0111-small.jpg'},{'fanart-0110':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0110-small.jpg'},{'fanart-0109':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0109-small.jpg'},{'fanart-0108':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0108-small.jpg'},{'fanart-0107':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0107-small.jpg'},{'fanart-0106':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0106-small.jpg'},{'fanart-0105':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0105-small.jpg'},{'fanart-0104':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0104-small.jpg'},{'fanart-0103':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0103-small.jpg'},{'fanart-0102':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0102-small.jpg'},{'fanart-0101':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0101-small.jpg'},{'fanart-0100':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0100-small.jpg'},{'fanart-0099':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0099-small.jpg'},{'fanart-0098':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0098-small.jpg'},{'fanart-0097':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0097-small.jpg'},{'fanart-0096':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0096-small.jpg'},{'fanart-0095':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0095-small.jpg'},{'fanart-0094':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0094-small.jpg'},{'fanart-0093':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0093-small.jpg'},{'fanart-0092':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0092-small.jpg'},{'fanart-0091':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0091-small.jpg'},{'fanart-0090':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0090-small.jpg'},{'fanart-0089':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0089-small.jpg'},{'fanart-0088':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0088-small.jpg'},{'fanart-0087':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0087-small.jpg'},{'fanart-0086':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0086-small.jpg'},{'fanart-0085':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0085-small.jpg'},{'fanart-0084':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0084-small.jpg'},{'fanart-0083':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0083-small.jpg'},{'fanart-0082':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0082-small.jpg'},{'fanart-0081':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0081-small.jpg'},{'fanart-0080':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0080-small.jpg'},{'fanart-0079':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0079-small.jpg'},{'fanart-0078':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0078-small.jpg'},{'fanart-0077':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0077-small.jpg'},{'fanart-0076':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0076-small.jpg'},{'fanart-0075':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0075-small.jpg'},{'fanart-0074':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0074-small.jpg'},{'fanart-0073':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0073-small.jpg'},{'fanart-0072':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0072-small.jpg'},{'fanart-0071':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0071-small.jpg'},{'fanart-0070':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0070-small.jpg'},{'fanart-0069':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0069-small.jpg'},{'fanart-0068':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0068-small.jpg'},{'fanart-0067':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0067-small.jpg'},{'fanart-0066':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0066-small.jpg'},{'fanart-0065':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0065-small.jpg'},{'fanart-0064':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0064-small.jpg'},{'fanart-0063':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0063-small.jpg'},{'fanart-0062':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0062-small.jpg'},{'fanart-0061':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0061-small.jpg'},{'fanart-0060':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0060-small.jpg'},{'fanart-0059':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0059-small.jpg'},{'fanart-0058':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0058-small.jpg'},{'fanart-0057':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0057-small.jpg'},{'fanart-0056':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0056-small.jpg'},{'fanart-0055':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0055-small.jpg'},{'fanart-0054':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0054-small.jpg'},{'fanart-0053':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0053-small.jpg'},{'fanart-0052':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0052-small.jpg'},{'fanart-0051':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0051-small.jpg'},{'fanart-0050':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0050-small.jpg'},{'fanart-0049':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0049-small.jpg'},{'fanart-0048':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0048-small.jpg'},{'fanart-0047':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0047-small.jpg'},{'fanart-0046':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0046-small.jpg'},{'fanart-0045':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0045-small.jpg'},{'fanart-0044':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0044-small.jpg'},{'fanart-0043':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0043-small.jpg'},{'fanart-0042':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0042-small.jpg'},{'fanart-0041':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0041-small.jpg'},{'fanart-0040':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0040-small.jpg'},{'fanart-0039':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0039-small.jpg'},{'fanart-0038':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0038-small.jpg'},{'fanart-0037':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0037-small.jpg'},{'fanart-0036':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0036-small.jpg'},{'fanart-0035':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0035-small.jpg'},{'fanart-0034':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0034-small.jpg'},{'fanart-0033':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0033-small.jpg'},{'fanart-0032':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0032-small.jpg'},{'fanart-0031':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0031-small.jpg'},{'fanart-0030':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0030-small.jpg'},{'fanart-0029':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0029-small.jpg'},{'fanart-0028':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0028-small.jpg'},{'fanart-0027':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0027-small.jpg'},{'fanart-0026':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0026-small.jpg'},{'fanart-0025':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0025-small.jpg'},{'fanart-0024':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0024-small.jpg'},{'fanart-0023':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0023-small.jpg'},{'fanart-0022':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0022-small.jpg'},{'fanart-0021':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0021-small.jpg'},{'fanart-0020':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0020-small.jpg'},{'fanart-0019':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0019-small.jpg'},{'fanart-0018':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0018-small.jpg'},{'fanart-0017':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0017-small.jpg'},{'fanart-0016':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0016-small.jpg'},{'fanart-0015':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0015-small.jpg'},{'fanart-0014':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0014-small.jpg'},{'fanart-0013':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0013-small.jpg'},{'fanart-0012':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0012-small.jpg'},{'fanart-0011':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0011-small.jpg'},{'fanart-0010':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0010-small.jpg'},{'fanart-0009':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0009-small.jpg'},{'fanart-0008':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0008-small.jpg'},{'fanart-0007':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0007-small.jpg'},{'fanart-0006':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0006-small.jpg'},{'fanart-0005':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0005-small.jpg'},{'fanart-0004':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0004-small.jpg'},{'fanart-0003':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0003-small.jpg'},{'fanart-0002':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0002-small.jpg'},{'fanart-0001':'http://img1.cache.netease.com/game/sc2/media/fanart/fanart-0001-small.jpg'}]
            }
        };
        this.items = $(Jnode);
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.data=this.cfg.data;
        this.init();

    };
  
  JV.gallery.prototype = {
/**
     * boolean to determine if init() has been run yet
     */
    initialized: false,

    /**
     * array to cache film strip responses
     */
    filmStripCache: {},

    /**
     * temporary keywords (not applied until hit 'apply')
     */
    tempKeywords: "",

    /**
     * list of keywords for filtering
     */
    keywords: "",

    /**
     * Id of the current item
     */
    currentId:         "",

    /**
     * Type of gallery, can be images or videos
     */
    galleryType: "images",

    /**
     * data key for ajax call
     */
    dataKey: null,

    /**
     * array to cache thumbnail pages
     */
    thumbnailPageCache: {},

    pageTimeout:       null,
    slideTimeout:      null,
    
    /*
     * 评论锁定
     **/
    commenton: null ,

    /**
     * Current thumbnail page
     */
    currentThumbnailPage: 1,
    commentLoadTimeout: null, //timer for the delay of loading comments
    metaDataTimeout:    null, //timer for the delay of loading meta data
    imagePreloadTimeout: null, //timer for the delay of preloading images
    imageTimeout:       null, //time for the delay of setting the viewing image
    /*
     * Constants
     */
    THUMBNAIL_HOLDER_HEIGHT: 630,

    /**
     * total height of thumbnail including borders, margin, and padding
     */
    THUMBNAIL_HEIGHT: 90,

    /**
     * ids of elements used in script
     */
    AJAX_CONTAINER_ID: "#item-viewer",
    PREV_LINK_ID:      "#previous-item",
    NEXT_LINK_ID:      "#next-item",
    THUMBNAIL_LIST_ID: "#media-thumbnails .thumbnail-link",
    AJAX_URL:          "media/meta-data",
    PAGING_NODE:       "#thumbnail-page",
    PRELOAD_CONTAINER_ID: "#media-preload-container",
    META_CONTAINER_ID: "#media-meta-data",
    FLASH_CONTAINER_ID: "#flash-container",
    COMMENTS_NODE_ID:  "#media-comments",

    /**
     * Initializes the image viewer class, caches necessary data
     */
    init: function() {
        var self=this,
            data=self.data;
        //store containers
        JV.gallery.preloadContainer = $(JV.gallery.PRELOAD_CONTAINER_ID);
        JV.gallery.metaDataContainer = $(JV.gallery.META_CONTAINER_ID);

        if (JV.gallery.galleryType == "images") {
            JV.gallery.currentImage = document.getElementById("current-image");
        }

        //store data key
        if (data.dataKey) {
            JV.gallery.dataKey = data.dataKey;
        }

        if (!JV.gallery.commentsNode) {
            JV.gallery.commentsNode = $(JV.gallery.COMMENTS_NODE_ID);
        }

        if (!JV.gallery.flashContainer) {
            JV.gallery.flashContainer = $(JV.gallery.FLASH_CONTAINER_ID);
        }

        if (!JV.gallery.loadCommentCache) {
            JV.gallery.loadCommentCache = JV.gallery.commentsNode.html();
        }

        //cache thumbnail nodes (link and img)
        var tempNodeList = [];
        var tempImageList = [];
        try {
            var indicesLength = indices.length;
            for (var x = 0; x < indicesLength; x++) {
                tempNodeList[x] = $("#" + indices[x]);
                tempImageList[x] = tempNodeList[x].find("span");
            }
        } catch(e) { }

        JV.gallery.thumbnailLinkNodes = tempNodeList;
        JV.gallery.thumbnailImageNodes = tempImageList;

        JV.gallery.initialized = true;
    },
    /*
     * Load item based on its id and the gallery type
     */
    loadItem: function(nodeId) {

        if (!JV.gallery.initialized) {
            JV.gallery.init();
        }

        if (!JV.gallery.dataKey) {
            return;
        }

        var oldIndex = (JV.gallery.currentId == "") ? 0 : JV.gallery.getIndex(JV.gallery.currentId);
        var newIndex = JV.gallery.getIndex(nodeId);

        if (oldIndex != newIndex || newIndex==0) {//modify by jay
            //set comments node back to 'Loading comments...'
            JV.gallery.commentsNode.html(JV.gallery.loadCommentCache);

            //set hash for bookmarking
            location.hash = "/" + nodeId;
            JV.gallery.currentId = nodeId;

            //set new active thumbnail
            JV.gallery.thumbnailLinkNodes[oldIndex].removeClass("active-film-strip-thumb-wrapper");
            JV.gallery.thumbnailLinkNodes[newIndex].addClass("active-film-strip-thumb-wrapper");

            //ensure thumbnails are all loaded
            JV.gallery.loadFilmStripThumbnails(scrollOffset);

            //ensure selected image is on the scroll bar
            var scrollOffset = JV.gallery.getScrollOffset();

            JV.gallery.nudgeScrollContent((newIndex + 1) * JV.gallery.THUMBNAIL_HEIGHT, oldIndex, newIndex, JV.gallery.THUMBNAIL_HEIGHT);

            //load cached meta data modfiy by jay
            /*if (JV.gallery.filmStripCache[nodeId]) {
                JV.gallery.metaDataContainer.html(JV.gallery.filmStripCache[nodeId]);
                JV.gallery.loadComments(nodeId, 0);

                //preload two next/previous images
                if (JV.gallery.galleryType == "images") {
                    //JV.gallery.preloadImages(JV.gallery.getPreloadIndices(newIndex, (oldIndex < newIndex)), "large");
                }
            } else {*/
                //hide image or video so we can see loader
                if (JV.gallery.galleryType == "images") {
                    JV.gallery.currentImage.style.display = "none";
                } else {
                    //unload swf
                    var videoObj = swfobject.getObjectById("flash-video");

                    if (videoObj) {
                        swfobject.removeSWF("flash-video");
                        var newDiv = document.createElement("div");
                        newDiv.id = "flash-video";
                        JV.gallery.flashContainer.html(newDiv);
                    }
                }

                if (JV.gallery.metaDataTimeout != null) {
                    clearTimeout(JV.gallery.metaDataTimeout);
                }

                JV.gallery.metaDataTimeout = setTimeout(function(){
                    //fetch data
                    $.ajax({
                        type: "GET",
                        url: "/" + JV.gallery.AJAX_URL,
                        data: ({
                            id: nodeId,
                            dataKey: JV.gallery.dataKey
                        }),
                        dataType: "html",
                        success: function(msg) {//jay#1 msg变成接收大图地址，图片说明，关键字，下载
                            //set meta data and cache
                            var msg=eval("("+msg+")");
                            var uploadDate =msg.uploadDate;
                            var keywords=msg.keywords;
                            var submitman=msg.submit;
                            var detailJson = eval("("+msg.detailJson+")"); //added by yuandg
                            commenton=msg.commentOn;                            
                        
                            var keys=[];
                            var title=msg.title;
                            
                            if(keywords.length){                                
                                for(var i=0;i<keywords.length;i++){
                                    keys.push('<a href="?keywords='+keywords[i].key+'">'+keywords[i].value+'</a>');
                                }
                                keys="<span style='border-left:1px solid #005A8E; font-size:14px; padding:0 10px;margin-left:10px'>关键词："+keys.join("，")+"</span>";  
                            }else{
                                keys="";    
                            }
                            
                            //modified by yuandg
                            var downloadHtml="";
                            var resolutionsHtml="";
                            if(typeof detailJson.full != "undefined") {
                                downloadHtml='<p><a target="_blank" href="'+detailJson.full+'">下载完整图片</a></p>';
                            }
                            var resolutionList = detailJson.resolutionList;
                            if((typeof resolutionList != "undefined") && (resolutionList.length > 0)) {
                                for(var i=0;i<resolutionList.length;i++){
                                    for(var resolution in resolutionList[i]){
                                        resolutionsHtml+='<a style="padding:0 5px; display:inline-block" target="_blank" href='+resolutionList[i][resolution]+'>'+resolution+'</a>,';   
                                    }
                                }
                                resolutionsHtml="<p style='word-break:break-all;word-wrap:break-word'>分辨率："+resolutionsHtml.substring(0,resolutionsHtml.length-1)+"</p>";
                            }
                            var titleHtml='';
                            if(typeof title != 'undefined'){
                                titleHtml='<p style="font-size:18px">'+title+'</p>';
                            }else{
                                titleHtml='';
                            }
                            
                            var submitMan=''
                            if(typeof submitman != 'undefined' && submitman != ''){
                                submitMan=' <span style="border-left:1px solid #005A8E; padding-right:6px"></span>提交人：'+submitman;
                            }else{
                                submitMan='';
                            }
                            
                        
                            var html=titleHtml+'<p>上传日期：'+uploadDate+keys+submitMan+'</p>'+downloadHtml + resolutionsHtml;
                            
                            
                            itemPaths[newIndex]=detailJson.large;
                            JV.gallery.metaDataContainer.html(html);
                            JV.gallery.filmStripCache[nodeId] = html;
                            JV.gallery.loadComments(nodeId, 0);
                    //for keywords
                    $(".keyword-filter").each(function(){
                        var key=$(this).attr("ref");
                        if(keys.indexOf(key)!=-1){
                            $(this).addClass("checked");    
                        }else{
                            $(this).removeClass("checked"); 
                        }   
                    })                          
                            
            //set image modify by jay
            if (JV.gallery.galleryType == "images") {
                var tempImage = new Image();
                tempImage.src = itemPaths[newIndex];//modify by jay
                JV.gallery.imageLoader(tempImage);
            } else if (JV.gallery.galleryType == "videos") {
                var path=detailJson.flvPath;
                var w=detailJson.width;
                var h=detailJson.height;
                JV.gallery.setVideo(path,w,h);
            }
                            //preload two next/previous images
                            if (JV.gallery.galleryType == "images") {
                                //JV.gallery.preloadImages(JV.gallery.getPreloadIndices(newIndex, (oldIndex < newIndex)), "large");
                            }
                        },
                        error: function(msg) {

                        }
                    });
                }, 200);

            }


        //}
    },
    imageLoader: function(loadingImage) {
        clearTimeout(JV.gallery.imageTimeout);

        if (loadingImage.complete) {
            JV.gallery.currentImage.src = loadingImage.src;
            JV.gallery.currentImage.style.display = "";
        } else {
            JV.gallery.currentImage.style.display = "none";
            JV.gallery.imageTimeout = setTimeout(function() { JV.gallery.imageLoader(loadingImage) }, 300);
        }
    },
    setVideo: function(path,w,h) {//modify by jay

        var currentVideoData = path;
        /*var newFlashVars = $.extend({//modify by jay
            flvPath:   Flash.videoBase + currentVideoData.flv,
            flvWidth:  currentVideoData.w,
            flvHeight:         currentVideoData.h,
            captionsPath:      "",
            captionsDefaultOn: (Core.locale != "en-us" && Core.locale != "en-gb")
        }, Flash.defaultVideoFlashVars);*/
        
        var newFlashVars={
            flvPath:currentVideoData,
            flvWidth:w,
            flvHeight:h,
            autoPlay:true
        }
        //add captions
        /*if (typeof currentVideoData.captionsPath != "undefined" && currentVideoData.captionsPath != "") {
            newFlashVars.captionsPath = currentVideoData.captionsPath;
        } else {
            delete newFlashVars.captionsPath;
        }

        //change rating if needed
        if (typeof currentVideoData.customRating != "undefined" && currentVideoData.customRating != "") {
            if (currentVideoData.customRating == "NONE") {
                delete newFlashVars.ratingPath;
            } else {
                newFlashVars.ratingPath = currentVideoData.customRating;
            }
        } else {
            newFlashVars.ratingPath = Flash.ratingImage;
        }*/

        //generate no cache string
            var noCache = new Date();
            noCache = "?nocache=" + noCache.getTime();
Flash.videoPlayer = 'http://nos.netease.com/sc2/1/style/gameinfo/content/global-video-player/themes/sc2/video-player.swf';
        swfobject.embedSWF(Flash.videoPlayer + noCache, "flash-video", w, h, Flash.requiredVersion, Flash.expressInstall, newFlashVars, Flash.defaultVideoParams, {}, JV.gallery.flashEmbedCallback);
        //swfobject.embedSWF(Flash.videoPlayer + noCache, "flash-video", 400, 400, Flash.requiredVersion, Flash.expressInstall, newFlashVars, Flash.defaultVideoParams, {}, JV.gallery.flashEmbedCallback);

    },
    /*
     * @param int[] itemIndices
     * @param string suffix
     */
    preloadImages: function(itemIndices, suffix) {

        //delay preloading of images incase of fast paging
        if (JV.gallery.imagePreloadTimeout != null) {
            clearTimeout(JV.gallery.imagePreloadTimeout);
        }

        JV.gallery.imagePreloadTimeout = setTimeout(function() {
            var index = itemIndices.length - 1;

            if (index >= 0) {
                do {
                    var imagePreload = new Image();
                    imagePreload.src = itemPaths[itemIndices[index]] + "-" + suffix + ".jpg";
                    JV.gallery.preloadContainer.append(imagePreload);

                    //preload next thumbnail as well
                    if (suffix == "large") {
                        var smallImagePreload = new Image();
                        smallImagePreload.src = itemPaths[itemIndices[index]] + "-small.jpg";

                        JV.gallery.setImageBackground(smallImagePreload, JV.gallery.thumbnailLinkNodes[itemIndices[index]]);

                    }
                }
                while (index--);
            }
        }, 400);

        JV.gallery.preloadMetaData(itemIndices);
    },
    /*
     * @param int[] itemIndices
     */
    preloadMetaData: function(metaDataIndex) {

        var nodeId = indices[metaDataIndex];

            if (!JV.gallery.filmStripCache[nodeId]) {
                $.ajax({
                    type: "GET",
                    url: "/" + JV.gallery.AJAX_URL,
                    data: ({
                        id: nodeId,
                        dataKey: JV.gallery.dataKey,
                        preload: "preload"
                    }),
                    dataType: "html",
                    success: function(msg) {
                        JV.gallery.filmStripCache[nodeId] = msg;
                    }
                });
            }

    },
    getPreloadIndices: function(currentIndex, movingForward) {
        var preloadIndex = 0;
        var nextPreloadIndex = 0;

        if (movingForward) {
            preloadIndex = JV.gallery.getNextIndex(currentIndex);
            nextPreloadIndex = JV.gallery.getNextIndex(preloadIndex);
        } else {
            preloadIndex = JV.gallery.getPreviousIndex(currentIndex);
            nextPreloadIndex = JV.gallery.getPreviousIndex(preloadIndex);
        }

        return [preloadIndex, nextPreloadIndex];
    },
    /*
     * Custom index function for faster look up
     */
    getIndex: function(id) {
        var index = indices.length - 1;

        if (index >= 0 && id != "") {
            do {
                if (indices[index] == id) {
                    return index;
                }
            }
            while (index--);
        }

        return 0;
    },
    /*
     * Get next item based on item type
     */
    getNextItem: function(id) {
        if (id && id != "") {
            JV.gallery.loadItem(id);
        } else {
            if (JV.gallery.currentId == "") JV.gallery.currentId = indices[0];

            JV.gallery.loadItem(JV.gallery.getNextId(JV.gallery.getIndex(JV.gallery.currentId)));
        }
    },
    /*
     * Get previous item based on item type
     */
    getPreviousItem: function(id) {
        if (JV.gallery.currentId == "") JV.gallery.currentId = indices[0];

        JV.gallery.loadItem(JV.gallery.getPreviousId(JV.gallery.getIndex(JV.gallery.currentId)));
    },
    getNextId: function(index) {
        return indices[JV.gallery.getNextIndex(index)];
    },
    getPreviousId: function(index) {
        return indices[JV.gallery.getPreviousIndex(index)];
    },
    getNextIndex: function(index) {
        return ((index + 1 == indices.length) ? 0 : index + 1);
    },
    getPreviousIndex: function(index) {
        return ((index > 0) ? index - 1 : indices.length - 1);
    },
    getNextPage: function() {
        var options={target:"commentPage",total:numThumbnailPages,urlPattern:"$0"};
        if (location.hash && location.hash != "") {
            var page = location.hash.substring(2) * 1;

            if (page + 1 > numThumbnailPages) {
                Utils.mediaPage(options,1);
                JV.gallery.loadPage(1);
            } else {
                Utils.mediaPage(options,page+1);
                JV.gallery.loadPage(page + 1);
                 
            }
        } else if (numThumbnailPages >= 2) {
            Utils.mediaPage(options,2);
            JV.gallery.loadPage(2);
        }
    },
    getPreviousPage: function() {
        var options={target:"commentPage",total:numThumbnailPages,urlPattern:"$0"};
        if (location.hash && location.hash != "") {
            var page = location.hash.substring(2) * 1;
            
            if (page > 1){ 
                Utils.mediaPage(options,page-1);
                JV.gallery.loadPage(page - 1);
            }else{ 
                Utils.mediaPage(options,numThumbnailPages);
                JV.gallery.loadPage(numThumbnailPages);
            }
            
        } else {
            Utils.mediaPage(options,numThumbnailPages);
            JV.gallery.loadPage(numThumbnailPages);
        }
    },
    loadPage: function(page) {
        if (!JV.gallery.initialized) {
            JV.gallery.init();
        }

        if (!JV.gallery.dataKey) {
            return;
        }

        if (!JV.gallery.thumbnailPageNode) {
            JV.gallery.thumbnailPageNode = $(JV.gallery.PAGING_NODE);
        }
        //page nav add active modify by jay\

        //$(".pagination-wrapper a[data-pagenum="+page+"]").parent().addClass("current").siblings().removeClass("current");
        JV.gallery.currentThumbnailPage = page;      
        //set nav active
        //$("#sub-nav > a[href*='"+JV.gallery.dataKey+"']").addClass("active").siblings().removeClass("active");
        
        location.hash = "/" + page;

        //update page display
        JV.gallery.currentPageDisplay.text(page);
        //if(page==1){return}
        if (JV.gallery.thumbnailPageCache[page]) {
            JV.gallery.thumbnailPageNode.html(JV.gallery.thumbnailPageCache[page]);
        } else {
            //get data
            $.ajax({
                type: "GET",
                url: "/media/thumbnail-page",
                data: ({
                    page: page,
                    dataKey: dataKey,
                    keywords: keywordParameter
                }),
                dataType: "html",
                success: function(msg) {//modify by jay
                    var msg=eval("("+msg+")");
                    var html="";
                    var dataKey=msg.dataKey;
                    var medias=msg.medias;
                    var imgStyle="";
                    keywordParameter=="''"?keywordParameter="":"";
                    var floatHtml="";
                    
                    //$("#currentKeywords").html(keywordParameter); 
                    for (var i=0;i<medias.length;i++){
                        if((i+1)%4==0){
                            imgStyle=" style='margin-right:0'"; 
                            floatHtml='<span class="clear"></span>';
                            
                        }else{
                            imgStyle="";
                            floatHtml="";   
                        }
                        if(typeof medias[i].title != "undefined"){
                            var title='<span class="thumb-title">'+medias[i].title+'</span>';
                        }else{
                            var title="";
                        }
                        //var backgroundImage = new Image();
                        //backgroundImage.src = imgPath;
                        
                        //style="background-image: url('+imgPath+');"
                        //modified by yuandg
                        html+='<a'+imgStyle+' href="/media/'+dataKey+'/?keywords='+keywordParameter+'&view#/'+medias[i].id+'" class="thumb-wrapper"><span class="thumb-bg thumbnail-loader"><span class="thumb-frame" data-thumbsrc="'+medias[i]["index-thumb"]+'"></span></span>'+title+'</a>'+floatHtml;
                    }
                    html="<div class='f-cb'>"+html+"</div>";
                    //$("#thumbnail-page a.thumb-wrapper").removeClass("thumbnail-loader");
//$("#thumbnail-page a.thumb-wrapper > span").css("background","none");
//$("#thumbnail-page a.thumb-wrapper").addClass("thumbnail-loader");debugger;                   
                    
                    JV.gallery.thumbnailPageNode.html(html);                 
                    JV.gallery.handleLoadPage(page);
                    //for keywords
                    $(".keyword-filter").each(function(){
                        var key=$(this).attr("ref");
                        if(keywordParameter.indexOf(key)!=-1){
                            $(this).addClass("checked");    
                        }else{
                            $(this).removeClass("checked"); 
                        }   
                    })
                },
                error: function(msg) {

                }
            });
        }
    },
    handleLoadPage: function(page) {
        if (!JV.gallery.initialized) {
            JV.gallery.init();
        }

        if (!JV.gallery.thumbnailPageNode) {
            JV.gallery.thumbnailPageNode = $(JV.gallery.PAGING_NODE);
        }

        JV.gallery.remainingImagesToLoad = $(".index-thumb", JV.gallery.thumbnailPageNode).length;

        $(".thumbnail-loader", JV.gallery.thumbnailPageNode).each(function(i) {
            var thumbNode = this;
            var imgSrc = $(".thumb-frame", thumbNode).attr("data-thumbsrc");

            //load images
            var tempImage = new Image();
            tempImage.src = imgSrc;
            setTimeout(function() {
              JV.gallery.loadThumbnailPageFrame(tempImage, imgSrc, $(thumbNode), page || 1);
            }, 100);
        });
    },
    loadThumbnailPageFrame: function(image, src, target, page) {
        if (image.complete) {

            JV.gallery.setImageBackground(image, target);
            JV.gallery.remainingImagesToLoad--;

            if (JV.gallery.remainingImagesToLoad == 0 && JV.gallery.currentThumbnailPage == page) {
                JV.gallery.thumbnailPageCache[page] = JV.gallery.thumbnailPageNode.html();
            }
        } else {
            setTimeout(function () {
                JV.gallery.loadThumbnailPageFrame(image, src, target, page)
            }, 100);
        }

    },
    nudgeScrollContent: function(margin, oldIndex, newIndex, imageSize) {
        var scrollPaneHeight = 615;
        var currentOffset = JV.gallery.getScrollOffset();
        
   

        //thumb is cut off at top
        var topLimit = newIndex * imageSize;
        if (currentOffset > topLimit) {
           oScrollbar.tinyscrollbar_update(topLimit);
        }

        //thumb is cut off at bottom
        if (newIndex > 6) {
            var bottomLimit = (newIndex - 6) * imageSize;
            if (currentOffset < bottomLimit) {
                oScrollbar.tinyscrollbar_update(bottomLimit);
            }
        }
    },
    prepareKeywords: function(triggerNode, activeClass, targetPath) {
        //set call back for this dropdown
        Toggle.callback = JV.gallery.cancelFilter;

        //fetch keywords from DOM (TODO: make better)
        if (JV.gallery.keywords == "") {
            var keywordData = document.getElementById("keyword-list");
            if (keywordData) JV.gallery.keywords = keywordData.innerHTML;
        }

        //assign temporary keywords
        JV.gallery.tempKeywords = JV.gallery.keywords;

        //trigger the open
        Toggle.open(triggerNode, activeClass, targetPath);
                    //for keywords modify by jay
                    var href=location.href;
                    $(".keyword-filter").each(function(){
                        var key=$(this).attr("ref");
                        if(href.indexOf(key)!=-1){
                            $(this).addClass("checked");    
                        }else{
                            $(this).removeClass("checked"); 
                        }   
                    })      
    },
    buildKeywords: function(node, keyword) {
        $(node).toggleClass("checked");

    },
    /*
     * Join keyworks and refresh page with new urls
     */
    applyKeywordFilter: function(onFilmStripView) {
        var keyArr=[];
        $(".keyword-filter").each(function(){
            if($(this).hasClass("checked")){
                var key=$(this).attr("ref");
                keyArr.push(key);
            }   
        })//modify by jay
        JV.gallery.keywords=keyArr.join(",")+",";
        //JV.gallery.keywords = JV.gallery.tempKeywords;

        var urlPrepend = "?";

        if (typeof onFilmStripView == "boolean" && onFilmStripView) {
            urlPrepend = "?view=&";
        }

        if (JV.gallery.keywords != "") {
            location.href = urlPrepend + "keywords=" + JV.gallery.keywords.substring(0, JV.gallery.keywords.length - 1);
        } else {
            location.href = location.pathname + (urlPrepend == "?" ? "" : urlPrepend);
        }
    },
    /*
     * Cancels the selected filters and resets back
     */
    cancelFilter: function() {

        //close element
        document.getElementById("filter-options").style.display = "none";

        $("#filter-options .keyword-filter").each(function(){

            var id = this.id.split("keyword-", 2)[1];

            if (JV.gallery.keywords.indexOf(id) == -1) {
                this.className = "keyword-filter";
            } else {
                this.className = "keyword-filter checked";
            }
        });
    },
    getViewableRange: function(offsetTop) {
        if (!offsetTop) var offsetTop = JV.gallery.getScrollOffset();

        var minThumbnailIndex = Math.floor(offsetTop / JV.gallery.THUMBNAIL_HEIGHT);
        var maxThumbnailIndex = Math.ceil((offsetTop + JV.gallery.THUMBNAIL_HOLDER_HEIGHT) / JV.gallery.THUMBNAIL_HEIGHT) - 1;

        //make sure index doesn't go above max range
        if (maxThumbnailIndex >= indices.length) maxThumbnailIndex = indices.length - 1;

        return [minThumbnailIndex, maxThumbnailIndex];
    },
    loadFilmStripThumbnails: function(offsetTop) {

        if (JV.gallery.slideTimeout != null) {
            clearTimeout(JV.gallery.slideTimeout);
        }

        JV.gallery.slideTimeout = setTimeout(function() {

            if (!JV.gallery.initialized) {
                JV.gallery.init();
            }

            if (!offsetTop) {
                var offsetTop = JV.gallery.getScrollOffset();
            }

            var thumbnailBounds = JV.gallery.getViewableRange(offsetTop);
            var minThumbnailIndex = thumbnailBounds[0];
            var maxThumbnailIndex = thumbnailBounds[1];

            for (var x = minThumbnailIndex; x <= maxThumbnailIndex; x++) {
                if (JV.gallery.thumbnailLinkNodes[x].hasClass("thumbnail-loader")) {
                    var bg = JV.gallery.thumbnailImageNodes[x].attr("data-thumbsrc");

                    var backgroundImage = new Image();
                    backgroundImage.src = bg;

                    JV.gallery.setImageBackground(backgroundImage, JV.gallery.thumbnailLinkNodes[x]);
                }
            }
        }, 100);
    },
    thumbSlide: function() {
      clearTimeout(JV.gallery.slideTimeout);
        JV.gallery.slideTimeout = setTimeout(function () {
            JV.gallery.loadFilmStripThumbnails()
        }, 100);
    },
    setImageBackground: function(backgroundImage, target) {

        if (backgroundImage.complete) {
            target.css("background-image", "url(' " + backgroundImage.src + "')").removeClass("thumbnail-loader");

        } else {
            setTimeout(function() { JV.gallery.setImageBackground(backgroundImage, target) }, 100);
        }


    },
    loadComments: function(nodeId, commentsPage) {
    
        
        
        
        if(commenton==1){
            Public.appendComment("/comments/show/M-"+nodeId,"media-comments",960);
            Public.commentsInt();
        }else if(commenton==0){
            var divBox=$('<div style="background: #011E4B;border: 4px solid #011E4B; border-radius: 4px 4px 4px 4px; color: #00D683; margin-top:10px; text-align:center">该评论已锁定！</div>')
            $('#media-comments').append(divBox)
        }

    },
    getHashInfo: function() {
        if (location.hash) {
            return(/#\/([^&]*)(?:&commentsPage=(.*))?/.exec(location.hash));
        } else {
            return [];
        }
    },
    getScrollOffset: function() {
        return Math.abs(parseInt(JV.gallery.filmStripThumbnails.css("top")));
    },
    /**
     * Display error when flash is not installed
     */
    flashEmbedCallback: function(e) {
        if (!e.success) {

            JV.gallery.flashContainer.html("flash no install");//modify by jay
            
            //hide loader
            $("#film-strip-ajax-target").css("background", "none");
        }       
    }

  };//prototype end


 })(jQuery);