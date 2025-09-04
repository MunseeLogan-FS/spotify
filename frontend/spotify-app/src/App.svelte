<script>
  import { onMount } from "svelte";
  // const API_URL = `http://127.0.0.1:3001/api/v1`;
  const API_URL = `https://spotify-project-d1c7ecedaee7.herokuapp.com/api/v1`;


  let userData = null;
  let trackData = [];
  let playlistData = [];
  let albumData = [];
  let artistData = [];
  let error = null;
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch(`${API_URL}/content/me`, {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text}`);
      }

      userData = await response.json();

      // Fetch more content
      const [tracksRes, playlistsRes, albumsRes, artistsRes] = await Promise.all([
        fetch(`${API_URL}/content/my-tracks`, { credentials: "include" }),
        fetch(`${API_URL}/content/my-playlists`, { credentials: "include" }),
        fetch(`${API_URL}/content/my-albums`, { credentials: "include" }),
        fetch(`${API_URL}/content/my-artists`, { credentials: "include" }),
      ]);

      trackData = await tracksRes.json();
      playlistData = await playlistsRes.json();
      albumData = await albumsRes.json();
      artistData = await artistsRes.json();
      trackData = trackData.items;
      playlistData = playlistData.items;
      albumData = albumData.items;
      artistData = artistData.artists.items;
      console.log(albumData);

    } catch (err) {
      console.error("Error fetching user data:", err);
      error = err.message;
    } finally {
      loading = false;
    }
  });

  const login = () => {
    window.location.href = `${API_URL}/auth/login`;
  };
</script>

<main>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Please log in</p>
    <button on:click={login}>Login with Spotify</button>
  {:else if userData}
    <section class="user-info">
      <img src="{userData.images[0]?.url}" alt="{userData.display_name}" />
      <h2>Welcome, {userData.display_name}!</h2>
    </section>

    <div class="grid-container">
        <section class="grid-item">
          <h3>My Tracks</h3>
            {#if trackData && trackData.length > 0}
              <ul>
            {#each trackData as item}
        <li>
          "{item.track.name}" 
          {#each item.track.artists as artist, i}
            {artist.name}{i < item.track.artists.length - 1 ? ', ' : ''}
          {/each}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No tracks found.</p>
  {/if}
</section>

      <section class="grid-item">
        <h3>My Playlists</h3>
             {#if playlistData && playlistData.length > 0}
              <ul>
            {#each playlistData as item}
        <li>
          "{item.name}" 
          {#each item.artists as artist, i}
            {artist.name}{i < item.artists.length - 1 ? ', ' : ''}
          {/each}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No tracks found.</p>
  {/if}
      </section>

      <section class="grid-item">
        <h3>My Albums</h3>
              {#if albumData && albumData.length > 0}
              <ul>
            {#each albumData as item}
        <li>
          "{item.album.name}" 
          {#each item.artists as artist, i}
            {artist.name}{i < item.artists.length - 1 ? ', ' : ''}
          {/each}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No tracks found.</p>
  {/if}
      </section>

      <section class="grid-item">
        <h3>My Artists</h3>
              {#if artistData && artistData.length > 0}
              <ul>
            {#each artistData as item}
        <li>
          "{item.name}" 
          {#each item.artists as artist, i}
            {artist.name}{i < item.artists.length - 1 ? ', ' : ''}
          {/each}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No tracks found.</p>
  {/if}
      </section>
    </div>
  {/if}
</main>

<style>
  :root {
    --bg-main: #181818;
    --bg-card: #242424;
    --text-main: #fff;
    --text-secondary: #b3b3b3;
    --accent: #1db954;
    --accent-hover: #17a44d;
    --shadow: 0 4px 12px rgba(0,0,0,0.32);
    --shadow-hover: 0 6px 18px rgba(0,0,0,0.44);
  }

  main {
    font-family: Arial, sans-serif;
    padding: 2rem;
    background-color: var(--bg-main);
    color: var(--text-main);
    min-height: 100vh;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .user-info img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent);
  }

  .user-info h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-main);
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .grid-item {
    background: var(--bg-card);
    padding: 1rem 1.2rem;
    border-radius: 12px;
    box-shadow: var(--shadow);
    max-height: 400px;
    overflow-y: auto;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .grid-item:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-hover);
  }

  .grid-item h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: var(--accent);
    font-size: 1.2rem;
    border-bottom: 2px solid var(--accent);
    padding-bottom: 0.3rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.95rem;
    color: var(--text-secondary);
  }

  li {
    margin-bottom: 0.6rem;
    line-height: 1.4;
  }

  button {
    background-color: var(--accent);
    color: var(--text-main);
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: var(--accent-hover);
  }

  p {
    margin: 0.5rem 0;
    color: var(--text-secondary);
  }
</style>
