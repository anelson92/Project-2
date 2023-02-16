const newFormHandler = async function(event) {
  event.preventDefault();

  const eventTitle = document.querySelector('#event_name').value;
  const description = document.querySelector('#description').value;
  const date = document.querySelector('#event_date').value;
  const location = document.querySelector('#event_loc').value;
  const filename = document.querySelector('#event_type').value;

  if (eventTitle && description && date && location && filename) {
    const response = await fetch(`api/event/`, {
      method: "POST",
      body: JSON.stringify({
      eventTitle,
      description,
      date,
      location,
      filename
    }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};
  

    document.location.replace("/profile");
  };


  // event listener for datepicker on newEvent form
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
  });
  
  document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);
=======
const cancelHandler = async () => {
  document.location.replace('/profile');
};


document.querySelector("#submit").addEventListener("click", newFormHandler);
document.querySelector("#cancel").addEventListener("click", cancelHandler);

