<template>
  <div class="flex min-h-screen bg-[#dce5e4]">
    <SideBar />

    <main class="flex-1 rounded-l-[40px] p-8 ml-[250px] mt-0">
      <h1 class="text-center text-black text-xl font-normal mb-8 pt-8">Welcome Back, Tooru!</h1>
      <div class="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-md">
        <p class="text-lg text-[#4a4a4a] font-medium mb-6">My Profile</p>
        <form class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label for="firstName" class="block text-sm font-normal text-[#4a4a4a] mb-1">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                readonly
                class="w-full rounded-lg border border-gray-300 px-4 py-2 text-base font-normal bg-gray-100 focus:outline-none focus:border-blue-400"
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
                class="w-full rounded-lg border border-gray-300 px-4 py-2 text-base font-normal bg-gray-100 focus:outline-none focus:border-blue-400"
                :value="lastName"
              />
              <button type="button" aria-label="Edit last name" class="absolute top-1/2 right-3 -translate-y-1/2 text-black text-lg mt-2">
                <i class="fas fa-pencil-alt text-gray-500 hover:text-blue-600"></i>
              </button>
            </div>
            <div>
              <label for="email" class="block text-sm font-normal text-[#4a4a4a] mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                readonly
                class="w-full rounded-lg border border-gray-300 px-4 py-2 text-base font-normal bg-gray-100 focus:outline-none focus:border-blue-400"
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
                class="w-full rounded-lg border border-gray-300 px-4 py-2 text-base font-normal bg-gray-100 focus:outline-none focus:border-blue-400"
                :value="contact"
              />
            </div>
            <div class="col-span-full flex items-center gap-2">
              <label class="block text-sm font-normal text-[#4a4a4a] w-24">Birthdate</label>
              <input
                id="birthDay"
                name="birthDay"
                type="text"
                readonly
                class="rounded-lg border border-gray-300 px-4 py-2 text-base font-normal w-16 text-center bg-gray-100 focus:outline-none focus:border-blue-400"
                :value="birthDay"
              />
              <input
                id="birthMonth"
                name="birthMonth"
                type="text"
                readonly
                class="rounded-lg border border-gray-300 px-4 py-2 text-base font-normal w-24 text-center bg-gray-100 focus:outline-none focus:border-blue-400"
                :value="birthMonth"
              />
              <input
                id="birthYear"
                name="birthYear"
                type="text"
                readonly
                class="rounded-lg border border-gray-300 px-4 py-2 text-base font-normal w-20 text-center bg-gray-100 focus:outline-none focus:border-blue-400"
                :value="birthYear"
              />
            </div>
            <div class="col-span-full flex items-center gap-6 mt-6 sm:mt-0">
              <span class="block text-sm font-normal text-[#4a4a4a] mr-4">Gender</span>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  class="w-4 h-4 text-[#0f2c4c] bg-[#0f2c4c] border-none focus:ring-blue-500"
                  :checked="gender === 'male'"
                  readonly
                />
                <span :class="{'text-[#0f2c4c]': gender === 'male', 'text-gray-500': gender !== 'male'}" class="text-sm font-normal">Male</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  class="w-4 h-4 text-gray-400 bg-gray-200 border-none focus:ring-blue-500"
                  :checked="gender === 'female'"
                  readonly
                />
                <span :class="{'text-[#0f2c4c]': gender === 'female', 'text-gray-500': gender !== 'female'}" class="text-sm font-normal">Female</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  class="w-4 h-4 text-gray-400 bg-gray-200 border-none focus:ring-blue-500"
                  :checked="gender === 'other'"
                  readonly
                />
                <span :class="{'text-[#0f2c4c]': gender === 'other', 'text-gray-500': gender !== 'other'}" class="text-sm font-normal">Other</span>
              </label>
            </div>
          </div>
        </form>
      </div>
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
/* No additional styles needed as Tailwind CSS classes are used for main content */
</style>