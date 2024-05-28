function generateReviewHTML(username, creationDate, reviewText) {
    // Convert the creation date to a readable format
    const formattedDate = new Date(creationDate).toLocaleDateString();

    // Create the HTML template for the review
    const reviewHTML = `
        <div class="review">
            <p class="review-title">${username} em ${formattedDate}</p>
            <p>${reviewText}</p>
        </div>
    `;

    return reviewHTML;
}