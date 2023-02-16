const newFormHandler = async function(event) {
  event.preventDefault();

  const event_name = document.querySelector('#event_name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const event_date = document.querySelector('#event_date').value.trim();
  const event_time = document.querySelector('.time').value.trim();
  const event_loc = document.querySelector('#event_loc').value.trim();
  const filename = document.querySelector('#event_type').value.trim();
  const hostedBy = document.querySelector('#hosted').value.trim();

  if (event_name && description && event_date && 
      event_time && event_loc && filename && hostedBy) {
    const response = await fetch(`api/event/`, {
      method: "POST",
      body: JSON.stringify({
      event_name,
      description,
      event_date,
      event_time,
      event_loc,
      filename,
      hostedBy
    }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
      console.log(response)
    } else {
      alert('Failed to create project');
    }
  }
};

const cancelHandler = async () => {
  document.location.replace('/profile');
};


document.querySelector("#submit").addEventListener("click", newFormHandler);
document.querySelector("#cancel").addEventListener("click", cancelHandler);

