document.addEventListener('DOMContentLoaded', () => {
    const ratingEntries = document.querySelectorAll('.rating-entry');
  
    ratingEntries.forEach(entry => {
      const itemId = entry.querySelector('.stars').dataset.itemId;
      const stars = entry.querySelectorAll('.star');
      const commentInput = entry.querySelector('.comment-input');
      const saveCommentBtn = entry.querySelector('.save-comment');
  
      // Load saved rating and comment from local storage
      const savedRating = localStorage.getItem(`rating_${itemId}`);
      const savedComment = localStorage.getItem(`comment_${itemId}`);
  
      if (savedRating) {
        updateStarRating(stars, parseInt(savedRating));
      }
      if (savedComment) {
        commentInput.value = savedComment;
      }
  
      // Star rating functionality
      stars.forEach(star => {
        star.addEventListener('click', (event) => {
          const rating = event.target.dataset.value;
          updateStarRating(stars, parseInt(rating));
         // Save rating to local storage
        });
  
        star.addEventListener('mouseover', (event) => {
          const rating = event.target.dataset.value;
          highlightStars(stars, parseInt(rating));
        });
  
        star.addEventListener('mouseout', () => {
          updateStarRating(stars, currentRating ? parseInt(currentRating) : 0);
        });
      });
  
      // Save comment functionality
      saveCommentBtn.addEventListener('click', () => {
        localStorage.setItem(`comment_${itemId}`, commentInput.value); // Save comment to local storage
        alert('Comment saved!');
      });
    });
  });
  
  function highlightStars(stars, rating) {
    stars.forEach(star => {
      if (star.dataset.value <= rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }
  
  function updateStarRating(stars, rating) {
    stars.forEach(star => {
      if (star.dataset.value <= rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }
  function displayComments(entryId) {
    const commentsDisplay = document.getElementById(`comments-display-${entryId}`);
    commentsDisplay.innerHTML = ''; // Clear existing comments

    const existingComments = JSON.parse(localStorage.getItem(`comments_${entryId}`)) || [];

    existingComments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.innerHTML = `
            <p>${comment.text}</p>
            <small>${comment.timestamp}</small>
            <button onclick="editComment('${entryId}', ${index})">Edit</button>
            <button onclick="deleteComment('${entryId}', ${index})">Delete</button>
        `;
        commentsDisplay.appendChild(commentDiv);
    });
  }
  
  function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentsContainer = document.getElementById('commentsContainer');
    const userComment = commentInput.value.trim();
    if (userComment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment'; // Add the class for styling
        commentDiv.textContent = userComment;
        commentsContainer.appendChild(commentDiv);
        commentInput.value = '';
    }
}


