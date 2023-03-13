export default function AuthorDetail() {
  return (
    <section class="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
      <div class="container mx-auto">
        <div class="-mx-4 flex flex-wrap justify-center items-center">
          <div class="px-4">
            <div class="mx-auto mb-10 w-full max-w-[370px]">
              <div class="relative overflow-hidden rounded-lg">
                <img
                  src="https://avatars.githubusercontent.com/u/59170344?v=4"
                  alt="image"
                  class="w-full"
                />
              </div>
            </div>
          </div>
          <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4">
              <div class="mx-auto mb-[60px] max-w-[510px] text-center">
                <span class="text-primary mb-2 block text-lg font-semibold">
                  Editor
                </span>
                <h2
                  class="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]"
                >
                  Belén Yarde Buller
                </h2>
                <p class="text-body-color text-base">
                Licenciada en Periodismo de la Universidad Nacional de Lomas de Zamora. Profesora de Periodismo de Investigación y de Periodismo Político en la Universidad de Palermo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
// TODO 404 not found page with path "*" and tailwind template
// TODO dark mode button on navbar
