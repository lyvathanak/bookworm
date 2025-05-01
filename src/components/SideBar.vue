<template>
  <aside class="bg-[#0f2c4c] w-64 flex flex-col">
    <div class="flex items-center gap-3 px-6 py-5 rounded-tr-[40px] rounded-br-[40px] bg-[#0f2c4c] shadow-[inset_0_-10px_10px_-10px_rgba(0,0,0,0.3)]">
      <img
        alt="Profile picture of Tooru Kirishima with blue hair and glasses"
        class="rounded-full w-10 h-10 object-cover"
        height="40"
        src="https://storage.googleapis.com/a1aa/image/b052cd21-4385-4efb-8e6c-d9b2516aa69e.jpg"
        width="40"
      />
      <div class="text-white leading-tight">
        <p class="text-lg font-normal">Tooru Kirishima</p>
        <p class="text-sm font-light">Baby sitter</p>
      </div>
    </div>
    <nav class="mt-6 flex flex-col gap-4 px-6">
      <router-link
        to="/account"
        class="flex items-center gap-4 text-white bg-[#1a3a5f] rounded-xl py-3 px-4"
      >
        <div class="bg-[#d9d9d9] text-[#0f2c4c] rounded-full w-8 h-8 flex items-center justify-center">
          <i class="fas fa-user"></i>
        </div>
        <span class="text-base font-normal">My Profile</span>
      </router-link>
      <router-link
        to="/orders"
        class="flex items-center gap-4 text-white hover:bg-[#1a3a5f] rounded-xl py-3 px-4 transition-colors"
      >
        <div class="bg-[#d9d9d9] text-[#0f2c4c] rounded-full w-8 h-8 flex items-center justify-center">
          <i class="fas fa-clipboard-list"></i>
        </div>
        <span class="text-base font-normal">My Orders</span>
      </router-link>
      <router-link
        to="/wishlist"
        class="flex items-center gap-4 text-white hover:bg-[#1a3a5f] rounded-xl py-3 px-4 transition-colors"
      >
        <div class="bg-[#d9d9d9] text-[#0f2c4c] rounded-full w-8 h-8 flex items-center justify-center">
          <i class="fas fa-heart"></i>
        </div>
        <span class="text-base font-normal">My Wishlist</span>
      </router-link>
      <router-link
        to="/address"
        class="flex items-center gap-4 text-white hover:bg-[#1a3a5f] rounded-xl py-3 px-4 transition-colors"
      >
        <div class="bg-[#d9d9d9] text-[#0f2c4c] rounded-full w-8 h-8 flex items-center justify-center">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <span class="text-base font-normal">My address</span>
      </router-link>
      <router-link
        to="/change-password"
        class="flex items-center gap-4 text-white hover:bg-[#1a3a5f] rounded-xl py-3 px-4 transition-colors"
      >
        <div class="bg-[#d9d9d9] text-[#0f2c4c] rounded-full w-8 h-8 flex items-center justify-center">
          <i class="fas fa-key"></i>
        </div>
        <span class="text-base font-normal">Change Password</span>
      </router-link>
      <router-link
        to="/logout"
        class="flex items-center gap-4 text-white hover:bg-[#1a3a5f] rounded-xl py-3 px-4 transition-colors"
      >
        <div class="bg-[#d9d9d9] text-[#0f2c4c] rounded-full w-8 h-8 flex items-center justify-center">
          <i class="fas fa-sign-out-alt"></i>
        </div>
        <span class="text-base font-normal">Log out</span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>