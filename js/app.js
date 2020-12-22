const vm = new Vue({
  el: "#c",
  data: {
    sorteio: ["", "", "", "", "", "", ""],
    jogos: [
      ["08", "10", "15", "32", "40", "55"],
      ["09", "12", "15", "38", "40", "57"],
    ],
  },
  computed: {
    jogosResultado() {
      let sorteio = this.sorteio;

      return this.jogos
        .map((jogo) => {
          let totalAcertos = 0;

          let numeros = jogo.map((numero) => {
            let acerto = sorteio.includes(numero);
            if (acerto) totalAcertos++;
            return {
              value: numero,
              acerto: acerto,
            };
          });

          return {
            numeros: numeros,
            totalAcertos: totalAcertos,
            isQuadra: totalAcertos === 4,
            isQuina: totalAcertos === 5,
            isSena: totalAcertos === 6,
          };
        })
        .sort((jogo1, jogo2) => {
          if (jogo1.totalAcertos === jogo2.totalAcertos) return 0;
          return jogo1.totalAcertos < jogo2.totalAcertos ? 1 : -1;
        });
    },
  },
  mounted() {
    this.carregarJogos();
  },
  methods: {
    carregarJogos() {
      if (!this.$refs.inputJogos.value) {
        this.jogos = [...config.jogosDefault];
        return;
      }

      this.$refs.inputJogos.value.split("\n").forEach((inputJogo) => {
        let jogo = [];
        inputJogo
          .trim()
          .split(config.separador)
          .forEach((numero) => {
            jogo.push(numero.padStart(2, "0"));
          });

        this.jogos.push(jogo);

        //this.$refs.inputJogos.value = JSON.stringify(this.jogos);
      });
    },

    limpar() {
      this.sorteio = ["", "", "", "", "", "", ""];
    },
  },
});
