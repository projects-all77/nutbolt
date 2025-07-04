<script>
  import { onMount } from 'svelte';
  
  let profile = {
    name: '',
    email: '',
    avatar: '',
    bio: '',
    joined: ''
  };
  
  let stats = {
    totalNotes: 0,
    totalFolders: 0,
    totalTags: 0,
    wordsWritten: 0
  };
  
  onMount(() => {
    // Load profile and stats from database
    profile = {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '',
      bio: 'Passionate note-taker and knowledge organizer',
      joined: '2023-01-15'
    };
    
    stats = {
      totalNotes: 47,
      totalFolders: 8,
      totalTags: 15,
      wordsWritten: 12450
    };
  });
  
  function updateProfile() {
    // Save profile to database
    console.log('Updating profile:', profile);
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Profile</h1>
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
  </div>
  
  <div class="max-w-4xl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Profile Information</h2>
        
        <form on:submit|preventDefault={updateProfile} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              bind:value={profile.name}
              class="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              bind:value={profile.email}
              class="w-full p-2 border border-gray-300 rounded-md"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              bind:value={profile.bio}
              rows="3"
              class="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Joined</label>
            <input
              type="text"
              value={new Date(profile.joined).toLocaleDateString()}
              readonly
              class="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Update Profile
          </button>
        </form>
      </div>
      
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Statistics</h2>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{stats.totalNotes}</div>
            <div class="text-sm text-gray-600">Notes</div>
          </div>
          
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{stats.totalFolders}</div>
            <div class="text-sm text-gray-600">Folders</div>
          </div>
          
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-600">{stats.totalTags}</div>
            <div class="text-sm text-gray-600">Tags</div>
          </div>
          
          <div class="text-center p-4 bg-orange-50 rounded-lg">
            <div class="text-2xl font-bold text-orange-600">{stats.wordsWritten.toLocaleString()}</div>
            <div class="text-sm text-gray-600">Words Written</div>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="text-lg font-medium mb-2">Account Actions</h3>
          <div class="space-y-2">
            <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-left">
              Export All Data
            </button>
            <button class="w-full bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md text-left">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>