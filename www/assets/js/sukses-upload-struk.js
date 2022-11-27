var firstCon = firstConnection();
var typeK =  window.localStorage.getItem('jenis_kupon');
console.log('jenis kupon anda : '+typeK);

if(typeK == "silver")
{
	$("#img-success-kupon").append('<img src="assets/img/sample/kupon/silver.png">');
	$("#sukses-struk-jenis").html('Silver');
}
else
{
	$("#img-success-kupon").append('<img src="assets/img/sample/kupon/gold.png">');
	$("#sukses-struk-jenis").html('Gold');
}