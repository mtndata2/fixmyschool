document.getElementById('reportForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const photo = formData.get('photo');
  const video = formData.get('video');

  // Basic validation
  if (!formData.get('school') || !formData.get('location') || !formData.get('issue')) {
    alert('Please fill all required fields.');
    return;
  }

  if (photo && photo.size > 2 * 1024 * 1024) {
    alert('Image must be under 2MB.');
    return;
  }

  if (video && video.size > 20 * 1024 * 1024) {
    alert('Video must be under 20MB.');
    return;
  }

  try {
    const response = await fetch('https://your-worker-url.workers.dev/report', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      window.location.href = '/thank-you.html';
    } else {
      const error = await response.text();
      alert('Failed to submit report. ' + error);
    }
  } catch (err) {
    console.error('Error submitting report:', err);
    alert('Something went wrong. Please try again later.');
  }
});
