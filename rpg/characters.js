$(function () {

  $.getJSON(
    "http://lmu-diabolical.appspot.com/characters",
    function (characters) {
      $("tbody").append(characters.map(function (character) {
        var tr = $(".character-template").clone();
        tr.attr("id", character.id);
        tr.find(".avatar").attr("src", insertAvatar(character));
        tr.find(".name").text(character.name);
        tr.find(".gender").text(character.gender);
        tr.find(".class").text(character.classType);
        tr.find(".money").text(character.money);
        tr.find(".level").text(character.level);
        tr.find(".edit").click(function () {
          editCharacter(character)});
        tr.find(".delete").click(function () {deleteCharacter(character)});
        return tr;
      }));
      $("#myTable").tablesorter({sortList: [[1,0]],headers: { 0:{sorter: false}, 6:{sorter: false}, 7:{sorter: false}}});
  });

  var insertAvatar = function (character) {
    var id = character.gender.toLowerCase() === "male" ? 75 : 40;
    return character.gender.toLowerCase() + "/" + character.id % id + ".png";
  }

  var editCharacter = function (character) {
    $('#name-edit').val(character.name);
    $('#' + character.gender.toLowerCase()).attr('checked', true);
    // JD: 15
    $('#class-edit').val(character.classType);
    $('#money-edit').val(character.money);
    $('#level-edit').val(character.level);
    $('#edit').modal('show');
    $('#close-edit').click(function () {$('#edit').modal('hide')});
    $('#update').unbind().click(function () {
      var $btn = $(this).button('loading');
      var selectedValue = $('input[type=radio]:checked').val().toUpperCase();
      console.log($('#name-edit').val());
      $.ajax({
        type: 'PUT',
        url: "http://lmu-diabolical.appspot.com/characters/" + character.id,
        data: JSON.stringify({
          id: character.id,
          name: $('#name-edit').val(),
          classType: $('#class-edit').val(),
          gender: selectedValue,
          level: $('#level-edit').val(),
          money: $('#money-edit').val()
        }),
        contentType: "application/json",
        dataType: "json",
        accept: "application/json",
        success: function (data, textStatus, jqXHR) {
          console.log("Done: no news is good news.");
          $btn.button('reset');
          $('#edit').modal('hide');
          updateCharacterRow(character);
        }
      });
    });
  }

  var updateCharacterRow = function (oldcharacter) {
    console.log(oldcharacter.id);
    $.getJSON(
      "http://lmu-diabolical.appspot.com/characters/" + oldcharacter.id,
      function (character) {
        console.log(character.id);
        console.log("got-in-updatechar");
        var tr = $('#' + character.id);
        console.log(tr);
        tr.find(".avatar").attr("src", insertAvatar(character));
        tr.find(".name").text(character.name);
        tr.find(".gender").text(character.gender);
        tr.find(".class").text(character.classType);
        tr.find(".money").text(character.money);
        tr.find(".level").text(character.level);
        tr.find(".edit").click(function () {editCharacter(character)});
        tr.find(".delete").click(function () {deleteCharacter(character)});
        $('#myTable').trigger('update');
        $("#myTable").tablesorter({sortList: [[1,0]],headers: { 0:{sorter: false}, 6:{sorter: false}, 7:{sorter: false}}});
        return tr;
      }
    ); 
  }

  var deleteCharacter = function (character) {
    var str = "Are you sure you want to delete " + "<b>" + character.name+"</b>" + "?" + "</br>"+"</br>";
    var html = $.parseHTML(str);
    $('#confirm-delete').html(html);
    $('#delete').modal('show');
    $('#close-delete').click(function () {$('#delete').modal('hide')});
    $('#delete-confirmed').unbind().click(function () {
      var $btn = $(this).button('loading')
      $.ajax({
        type: 'DELETE',
        url: "http://lmu-diabolical.appspot.com/characters/" + character.id,
        success: function (data, textStatus, jqXHR) {
          $('#' + character.id).remove();
          console.log("Gone baby gone.");
          $btn.button('reset');
          $('#myTable').trigger('update');
          $('#delete').modal('hide');
        }
      });
    });
  }

  $("#help-tab").click( function() {showModal(); return false;});

  var showModal = function () {
    $('#create-character').tooltip('toggle');
  }

  $('#create-character').click(function () {createCharacter()});

  var createCharacter = function () {
    $('#create').modal('show');
    $('#close-create').click(function () {$('#create').modal('hide')});
    $('#create-confirmed').unbind().click(function () {
      var selectedValue = $('input[type=radio]:checked').val().toUpperCase();
      var $btn = $(this).button('loading');
      $.ajax({
        type: 'POST',
        url: "http://lmu-diabolical.appspot.com/characters",
        data: JSON.stringify({
          name: $('#name-create').val(),
          classType: $('#class-create').val(),
          gender: selectedValue,
          level: $('#level-create').val(),
          money: $('#money-create').val()
        }),
        contentType: "application/json",
        dataType: "json",
        accept: "application/json",
        complete: function (jqXHR, textStatus) {
          console.log('paraapam');
          console.log("You may access the new character at:" +
          jqXHR.getResponseHeader("Location"));
          $btn.button('reset');
          //location.reload();
          var characterLocation = jqXHR.getResponseHeader("Location");
          var characterId = characterLocation.split("characters/")[1];
          updateTable(characterId);
          $('#create').modal('hide');
          clearCreateModal();
        }
      });
    });
  }

  var clearCreateModal = function() {
    $('#name-create').val('');
    $('#female-create').prop('checked', true);
    $('#class-create').val('');
    $('#money-create').val('');
    $('#level-create').val('');
  }

  var updateTable = function(characterId) {
  console.log('heello');
  $.getJSON(
    "http://lmu-diabolical.appspot.com/characters/" + characterId,
    function (character) {
        // Do something with the character.
        console.log(character);
        var tr = $(".character-template:first").clone();
        console.log(tr);
        tr.attr("id", character.id);
        tr.find(".avatar").attr("src", insertAvatar(character));
        tr.find(".name").text(character.name);
        tr.find(".gender").text(character.gender);
        tr.find(".class").text(character.classType);
        tr.find(".money").text(character.money);
        tr.find(".level").text(character.level);
        tr.find(".edit").click(function () {
          editCharacter(character)});
        tr.find(".delete").click(function () {deleteCharacter(character)});
        $("tbody").append(tr);
        $('#myTable').trigger('update');
        $("#myTable").tablesorter({sortList: [[1,0]],headers: { 0:{sorter: false}, 6:{sorter: false}, 7:{sorter: false}}});
        return tr;
    });
  }

  $(document).ready(function () {    
    // Search bar cortesy of http://bootsnipp.com/snippets/featured/js-table-filter-simple-insensitive
    var activeSystemClass = $('.list-group-item.active');
    $('#system-search').keyup(function () {
      var that = this;
      // affect all table rows on in systems table
      var tableHead = $('.table-list-search thead');
      var tableBody = $('.table-list-search tbody');
      var tableRowsClass = $('.table-list-search tbody tr');
      $('.search-sf').remove();
      tableRowsClass.each( function(i, val) {  
        //Lower text for case insensitive
        var rowText = $(val).text().toLowerCase();
        var inputText = $(that).val().toLowerCase();
        if (inputText != '') {
          $('.search-query-sf').remove();
          tableHead.prepend('<tr class="search-query-sf"><td colspan="6"><strong>Searching for: "' + $(that).val() + '"</strong></td></tr>');
        } else{
          $('.search-query-sf').remove();}
        if (rowText.indexOf( inputText ) == -1 ) {
          tableRowsClass.eq(i).hide();
        } else{
          $('.search-sf').remove();
          tableRowsClass.eq(i).show();
        }
      });
      //all tr elements are hidden
      if (tableRowsClass.children(':visible').length == 0) {
      tableHead.append('<tr class="search-sf"><td class="text-muted" colspan="6">No entries found.</td></tr>');
      }
    });
  });

});
