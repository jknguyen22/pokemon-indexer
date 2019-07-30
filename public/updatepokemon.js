function updatePokemon(id){
	$.ajax({
		url: '/pokemonball/' + id,
		type: 'PUT',
		data: $('#update-pbball').serialize(),
		success: function(result){
			window.location.replace("./");
		}
	})
};