<template>
    <div class="flex max-w-5xl w-full rounded-[40px] overflow-hidden shadow-lg">
      <!-- Sidebar -->
      <SideBar />
  
      <!-- Main Content -->
      <main class="flex-1 bg-[#dce5e4] rounded-[40px] p-8">
        <h1 class="text-center text-black text-xl font-normal mb-8">Welcome Back, Tooru!</h1>
        <form class="max-w-4xl mx-auto space-y-6">
          <p class="text-sm text-[#4a4a4a] font-normal mb-2">My Profile</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label for="firstName" class="block text-sm font-normal text-[#4a4a4a] mb-1">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                readonly
                class="w-full rounded-lg border-none px-4 py-2 text-base font-normal"
                :value="firstName"
              />
            </div>
            <div class="relative">
              <label for="lastName" class="block text-sm font-normal text-[#4a4a4a] mb-1">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                readonly
                class="w-full rounded-lg border-none px-4 py-2 text-base font-normal"
                :value="lastName"
              />
              <button type="button" aria-label="Edit last name" class="absolute top-1/2 right-3 -translate-y-1/2 text-black text-lg">
                <i class="fas fa-pencil-alt"></i>
              </button>
            </div>
            <div>
              <label for="email" class="block text-sm font-normal text-[#4a4a4a] mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                readonly
                class="w-full rounded-lg border-none px-4 py-2 text-base font-normal"
                :value="email"
              />
            </div>
            <div>
              <label for="contact" class="block text-sm font-normal text-[#4a4a4a] mb-1">Contact</label>
              <input
                id="contact"
                name="contact"
                type="text"
                readonly
                class="w-full rounded-lg border-none px-4 py-2 text-base font-normal"
                :value="contact"
              />
            </div>
            <div class="flex items-center gap-2">
              <label for="birthDay" class="block text-sm font-normal text-[#4a4a4a] mb-1 w-full">Birthdate</label>
              <input
                id="birthDay"
                name="birthDay"
                type="text"
                readonly
                class="rounded-lg border-none px-4 py-2 text-base font-normal w-16 text-center"
                :value="birthDay"
              />
              <input
                id="birthMonth"
                name="birthMonth"
                type="text"
                readonly
                class="rounded-lg border-none px-4 py-2 text-base font-normal w-24 text-center"
                :value="birthMonth"
              />
              <input
                id="birthYear"
                name="birthYear"
                type="text"
                readonly
                class="rounded-lg border-none px-4 py-2 text-base font-normal w-20 text-center"
                :value="birthYear"
              />
            </div>
            <div class="flex items-center gap-6 mt-6 sm:mt-0">
              <span class="block text-sm font-normal text-[#4a4a4a] mr-4">Gender</span>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  class="w-4 h-4 text-[#0f2c4c] bg-[#0f2c4c] border-none"
                  :checked="gender === 'male'"
                  readonly
                />
                <span class="text-[#0f2c4c] text-sm font-normal">Male</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  class="w-4 h-4 text-gray-200 bg-gray-200 border-none"
                  :checked="gender === 'female'"
                  readonly
                />
                <span class="text-gray-200 text-sm font-normal">Female</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  class="w-4 h-4 text-gray-200 bg-gray-200 border-none"
                  :checked="gender === 'other'"
                  readonly
                />
                <span class="text-gray-200 text-sm font-normal">Other</span>
              </label>
            </div>
          </div>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  import SideBar from '../components/SideBar.vue'
  
  export default {
    name: 'UserProfile',
    components: {
      SideBar
    },
    data() {
      return {
        firstName: "Tooru",
        lastName: "Kirishima",
        email: "kirishimababy@gmail.com",
        contact: "012345678",
        birthDay: "18",
        birthMonth: "November",
        birthYear: "1998",
        gender: "male"
      };
    }
  }
  </script>
  
  <style scoped>
  /* No additional styles needed as Tailwind CSS classes are used */
  </style>