//npm install jquery --save
//npm install jquery-csv --save
//npm install ajax --save


$(document).ready(function () {
  $("#title").html("Using jQuery");
});

$(document).ready(function () {
  $("#p1").html("Loading CSV data....");
  $("#p2").html("Note: makes use of live server extetion to enable the csv file to be loaded by making said folder a local server*");
  var _data = loadCSV("./laptop_price.csv");
  _data.success(function (data){
      var objs = createObject(data);
      $('#len').html("Total record(object):"+objs.length);
      $('#com').html("Company:"+objs[0].Company);
      $("#prod").html("Product:"+objs[0].Product);
      $("#tb1").html(createTable(data));  //basic html tag
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
          {
              table_data += '<th>'+cell_data[cell_count]+'</th>';
          }
          else
          {
              table_data += '<td>'+cell_data[cell_count]+'</td>';
          }
      }
      table_data += '</tr>';
  }
  table_data += '</table>';
  return table_data;
}

function createObject(data){
  var laptopData = data.split(/\r?\n|\r/);
  var laptopCol=[]; //array of objects for laptop
  for(var count = 0; count<laptopData.length; count++) //row
  {
      var property_data = laptopData[count].split(",");
      if(count != 0) {
          var obj = new Laptop(property_data[0],property_data[1],property_data[2],property_data[3],property_data[4],property_data[5],property_data[6],property_data[7],property_data[8], property_data[9],property_data[10],property_data[11],property_data[12]);
          laptopCol[count-1] = obj;
      }
  }
  return laptopCol;
}

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

// $(document).ready(function () {
//   $("#title").html("Using jQuery");
// });

// $(document).ready(function () {
//   $("#p1").html("Loading CSV data....");
//   var _data = loadCSV("./laptop_price.csv");
//   _data.success(function (data){
//    var objs = createObject(data);
//    $('#len').html("Total record(object):"+objs.length);
//    $('#com').html("Company:"+objs[0].Company);
//    $("#prod").html("Product:"+objs[0].Product);
//    $("#tb1").html(createTable(data));  //basic html tag
//  });
// });

// function loadCSV(file) {
//   return $.ajax({
//     type: "GET",
//     url: file,
//     dataType: "text",
//     success: function(data) {
//       return data;
//     },
//     error: function (request, status, error) {
//       return (status + ":" + error+"\n"+request.responseText);
//     }
//   });
// }

// function createTable(data) {
//   var laptopData = data.split(/\r?\n|\r/);
//   var table_data="<table>";
//   for(var count = 0; count<laptopData.length; count++)
//   {
//    var cell_data = laptopData[count].split(",");
//    table_data += '<tr>';
//    for(var cell_count=0; cell_count<cell_data.length; cell_count++)
//    {
//     if(count === 0)
//     {
//      table_data += '<th>'+cell_data[cell_count]+'</th>';
//     }
//     else
//     {
//      table_data += '<td>'+cell_data[cell_count]+'</td>';
//     }
//    }
//    table_data += '</tr>';
//   }
//   table_data += '</table>';
//  return table_data;
// }

// function createObject(data){
//   var laptopData = data.split(/\r?\n|\r/);
//   var laptopCol=[]; //array of objects for laptop
//   for(var count = 0; count<laptopData.length; count++) //row
//   {
//    var property_data = laptopData[count].split(",");
//    if(count != 0) {
//      var obj = new Laptop(property_data[0],property_data[1],property_data[2],property_data[3],property_data[4],property_data[5],property_data[6],property_data[7],property_data[8], property_data[9],property_data[10],property_data[11],property_data[12]);
//      laptopCol[count-1] = obj;
//     }
//   }
//  return laptopCol;
// }

// class Laptop {
//   constructor(laptop_ID,Company,Product,TypeName,Inches,
//     ScreenResolution,Cpu,Ram,Memory,Gpu,OpSys,Weight,Price_euros) {
//       this.laptop_ID=laptop_ID;
//       this.Company=Company;
//       this.Product=Product;
//       this.TypeName=TypeName;
//       this.Inches=Inches;
//       this.ScreenResolution=ScreenResolution;
//       this.Cpu=Cpu;
//       this.Ram=Ram;
//       this.Memory=Memory;
//       this.Gpu=Gpu;
//       this.OpSys=OpSys;
//       this.Weight=Weight;
//       this.Price_euros=Price_euros;
//     }
// }
