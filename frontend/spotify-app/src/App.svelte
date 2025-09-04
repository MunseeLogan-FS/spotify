<script>
  import { onMount } from "svelte";

  let userData = null;
  let error = null;
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/v1/content/me", {
        method: "GET",
        credentials: "include" // Critical for sending cookies
      });

      console.log(response.ok);

      if (!response.ok) {
        // Handle non-JSON responses
        const text = await response.text();
        console.error(`Server error: ${response.status}`, text);
        throw new Error(`Server returned ${response.status}`);
      }

      userData = await response.json();
      console.log("User data:", userData);
    } catch (err) {
      console.error("Error fetching user data:", err);
      error = err.message;
    } finally {
      loading = false;
    }
  });

  const login = () => {
    window.location.href = "/api/v1/auth/login";
  };
</script>

<main>
  <h1>My Spotify App</h1>
  
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
    <button on:click={login}>Login with Spotify</button>
  {:else if userData}
    <p>Welcome, {userData.display_name}!</p>
    <pre>{JSON.stringify(userData, null, 2)}</pre>
  {/if}
</main>