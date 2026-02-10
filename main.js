const searchForm = document.getElementById('searchForm');
if (searchForm) {
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!query) {
      resultsDiv.innerHTML = '<p>Please enter a keyword.</p>';
      return;
    }

    resultsDiv.innerHTML = `<p>Searching the web for "${query} F-15"...</p>`;

    try {
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query + ' F-15')}&format=json&no_html=1`
      );
      const data = await response.json();

      const results = data.RelatedTopics || [];
      if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
      }

      const fragment = document.createDocumentFragment();
      results.slice(0, 30).forEach((r, i) => {
        if (r.FirstURL && r.Text) {
          const a = document.createElement('a');
          a.href = r.FirstURL;
          a.textContent = `${i + 1}. ${r.Text}`;
          a.target = '_blank';
          fragment.appendChild(a);
        }
      });
      resultsDiv.innerHTML = '';
      resultsDiv.appendChild(fragment);
    } catch (err) {
      resultsDiv.innerHTML = `<p>Error fetching results: ${err.message}</p>`;
    }
  });
}