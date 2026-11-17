var pet_info = {name: "Buddy", weight: 10, happiness: 5};
var sleepImageTimeout = null;

$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.sleep-button').click(clickedSleepButton);

  $('.pet-image').hover(
    function() {
      $(this).addClass('pet-happy');
    },
    function() {
      $(this).removeClass('pet-happy');
    }
  );
});

function clickedTreatButton() {
  pet_info.happiness += 2;
  pet_info.weight += 1;
  showPetMessage("Yummy! I love treats!");
  showHeart();
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  pet_info.happiness += 2;
  pet_info.weight -= 1;
  showPetMessage("That was so much fun!");
  showHeart();
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  pet_info.happiness -= 2;
  pet_info.weight -= 2;
  showPetMessage("I'm getting tired!");
  checkAndUpdatePetInfoInHtml();
}

function clickedSleepButton() {
  pet_info.happiness += 3;
  showPetMessage("Zzz... I feel much better!");
  checkAndUpdatePetInfoInHtml();
  clearTimeout(sleepImageTimeout);
  $('.pet-image').attr('src', 'images/Sleepy-lion.png');
  sleepImageTimeout = setTimeout(function() {
    sleepImageTimeout = null;
    updatePetImage();
  }, 2000);
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info.name);
  $('.weight').text(pet_info.weight);
  $('.happiness').text(pet_info.happiness);

  if (sleepImageTimeout === null) {
    updatePetImage();
  }
}

function updatePetImage() {
  if (pet_info.weight >= 30) {
    $('.pet-image').attr('src', 'images/Fat-lion.png');
  } else if (pet_info.weight >= 10) {
    $('.pet-image').attr('src', 'images/Happy-lion.png');
  } else {
    $('.pet-image').attr('src', 'images/skinny-lion.png');
  }
}

function showPetMessage(message) {
  $('.pet-message').text(message);
}

function showHeart() {
  var newHeart = $('.heart-template').clone();
  newHeart.removeClass('heart-template');
  newHeart.addClass('floating-heart');
  $('.effects-container').append(newHeart);

  newHeart.fadeOut(1200, function() {
    $(this).remove();
  });
}
  