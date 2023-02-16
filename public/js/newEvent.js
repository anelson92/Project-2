const newFormHandler = async function(event) {
    event.preventDefault();
  
    //Need to add querySelectors after form is made
    const eventTitle = document.querySelector('TBA').value;
    const description = document.querySelector('TBA').value;
    const date = document.querySelector('TBA').value;
    const location = document.querySelector('TBA').value;
    const eventType = document.querySelector('TBA').value;
  
    const token = localStorage.getItem("token");
    await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({
        eventTitle,
        description,
        date,
        location,
        eventType
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    document.location.replace("/profile");
  };


  // event listener for datepicker on newEvent form
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
  });
  
  document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);