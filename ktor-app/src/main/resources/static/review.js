function generateReviewHTML(username, creationDate, reviewText) {
    // Convert the creation date to a readable format
    const formattedDate = new Date(creationDate).toLocaleDateString();

    // Create the HTML template for the review
    return `
        <div class="review">
            <b class="review-title">${username} em ${formattedDate}</b>
            <p class="review-text">${reviewText}</p>
        </div>
    `;
}