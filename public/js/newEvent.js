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
  
  document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);