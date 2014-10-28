$.getJSON(
    "http://lmu-diabolical.appspot.com/characters",
    function (characters) {
        $("tbody").append(characters.map(function (character) {
            var tr = $(".character-template").clone();
            tr.find(".avatar").html((insertAvatar(character)));
            tr.find(".name").text(character.name);
            tr.find(".gender").text(character.gender);
            tr.find(".class").text(character.classType);
            tr.find(".money").text(character.money);
            tr.find(".level").text(character.level);
            tr.find(".edit").click(function(){editCharacter(character)});
            tr.find(".delete").click(function(){deleteCharacter(character)});
            return tr;
        }));
    }
);

var insertAvatar = function(character) {
    if (character.gender.toLowerCase() == "male") {
        str = "<img src=\"http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-A2-icon.png\" class=\"avatar\"/>";
        html = $.parseHTML(str);
        return html
    } else{
        str = "<img src=\"http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Female-Face-FH-3-slim-icon.png\" class=\"avatar\"/>"
        html = $.parseHTML(str);
        return html
    }
}

var editCharacter = function(character) {
    $('#edit').modal('show');
    $('#name-edit').val(character.name);
    $('#' + character.gender.toLowerCase()).attr('checked', true);
    $('#class-edit').val(character.classType);
    $('#money-edit').val(character.money);
    $('#level-edit').val(character.level);
    console.log(character.id);
    console.log($('#name-edit').val());
    $('#update').click(function(){
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
                $('#edit').modal('hide');
                location.reload();
            }
        });
    });
}

var deleteCharacter = function(character) {
    str = "Are you sure you want to delete " + "<b>"+character.name+"</b>" + "?" + "</br>"+"</br>";
    html = $.parseHTML(str);
    $('#confirm-delete').html(html);
    $('#delete').modal('show');
    $('#delete-confirmed').click(function(){
        $.ajax({
            type: 'DELETE',
            url: "http://lmu-diabolical.appspot.com/characters/" + character.id,
            success: function (data, textStatus, jqXHR) {
                console.log("Gone baby gone.");
                location.reload();
            }
        });
    });
}

$('#create-character').click(function(){
        $('#create').modal('show');
});