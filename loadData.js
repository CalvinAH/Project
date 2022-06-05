//npm install jquery --save
//npm install jquery-csv --save
//npm install ajax --save


var Ubrand=[];
var lapType=[];
$(document).ready(function () {
  $("#title").html("APLC jQuery");
});

$(document).ready(function () {
  $("#p1").html("Loading CSV data....");
  $("#n1").html("Note 1:  Makes use of live server extetion to enable the csv file to be loaded by making said folder a local server*");
  $("#n2").html("Note 2:  Changed 490,Chuwi,'Lapbook 15,6',Notebook,15.6,Full HD 1920x1080,Intel Atom x5-Z8350 1.44GHz,4GB,64GB Flash Storage,Intel HD Graphics,Windows 10,1.89kg,248.90 \n \t to 490,Chuwi,'Lapbook 15.6',Notebook,15.6,Full HD 1920x1080,Intel Atom x5-Z8350 1.44GHz,4GB,64GB Flash Storage,Intel HD Graphics,Windows 10,1.89kg,248.90");
  $("#n3").html("Note 3:  Line 1305 also deleted becasue it was empty");
  $("#s1").html("Enter on search bar");
  
  var _data = loadCSV("./laptop_price.csv");
  _data.success(
    function (data){
      var objs = createObject(data);
      $('#len').html("Total record(object):"+objs.length);
      $("#brandInt").html("Amount of brands:"+ (Ubrand.length));
      console.log(Ubrand);
      console.log(lapType);
		  $("#type").html("Type of laptop:"+ lapType);
      $("#tb1").html(createTable(data));  //basic html tag
    },
    
  )
}
)
;
$(document).ready(function(){
	$("#inp").on("keyup", function() {
	  var value = $(this).val().toLowerCase();
	  $("#tb1 tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	  });
	});
  });



function loadCSV(file) {
  return $.ajax({
      type: "GET",
      url: file,
      dataType: "text",
      success: function(data) {
          return data;
      },
      error: function (request, status, error) {
          return (status + ":" + error+"\n"+request.responseText);
      }
  });
}

function createTable(data) {
  var laptopData = data.split(/\r?\n|\r/);
  var table_data="<table>";
  for(var count = 0; count<laptopData.length; count++)
  {
      var cell_data = laptopData[count].split(",");
      table_data += '<tr>';
      for(var cell_count=0; cell_count<cell_data.length; cell_count++)
      {
          if(count === 0)
          {table_data += '<th>'+cell_data[cell_count]+'</th>';}
          else
          {table_data += '<td>'+cell_data[cell_count]+'</td>';}
      }
      table_data += '</tr>';
  }
  table_data += '</table>';
  return table_data;
}



function createObject(data) {
	var laptopData = data.split(/\r?\n|\r/);
	var laptopCol = []; //array of objects for laptop
  var property_data = '';
	for (var count = 0; count < laptopData.length; count++) //row
	{
		property_data = laptopData[count].split(",");
    Ubrand = arrayFilter(Ubrand,property_data[1],filterHeader,"Company");
    lapType= arrayFilter(lapType,property_data[3],filterHeader,"TypeName");
		if (count != 0) {
			var obj = new Laptop(property_data[0], property_data[1], property_data[2], property_data[3], property_data[4], property_data[5], property_data[6], property_data[7], property_data[8], property_data[9], property_data[10], property_data[11], property_data[12]);
			laptopCol[count - 1] = obj;
      
		}
	}
  
	return laptopCol;
}

const filterHeader = (arr, query) => { //pure function
  return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) == -1)
}

function arrayFilter(array, sData, filter, head){// high order function
  if(array.includes(sData)==false){
    array.push(sData);
  }
  return filter(array, head)
}

function searchCurry (f){ //currying
  return function (data){
    return function (fil1){
      return f(data, fil1);
      
    }
  }
}

//let curriedSearch = searchCurry(searchCompanyTable);
// console.log( curriedSearch(data)(Appl))



class Laptop {
  constructor(laptop_ID,Company,Product,TypeName,Inches,
  ScreenResolution,Cpu,Ram,Memory,Gpu,OpSys,Weight,Price_euros) {
      this.laptop_ID=laptop_ID;
      this.Company=Company;
      this.Product=Product;
      this.TypeName=TypeName;
      this.Inches=Inches;
      this.ScreenResolution=ScreenResolution;
      this.Cpu=Cpu;
      this.Ram=Ram;
      this.Memory=Memory;
      this.Gpu=Gpu;
      this.OpSys=OpSys;
      this.Weight=Weight;
      this.Price_euros=Price_euros;
  }
}

