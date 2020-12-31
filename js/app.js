const vm = new Vue({
  el: "#app",
  data: {
    sorteio: [...config.sorteioDefault],
    jogos: [...config.jogosDefault],
  },
  computed: {
    jogosResultado() {
      return this.jogos
        .map((jogo) => {
          let totalAcertos = 0;

          let numeros = jogo.map((numero) => {
            let acerto = this.sorteio.includes(numero);
            if (acerto) totalAcertos++;
            return {
              value: numero,
              acerto: acerto,
            };
          });

          return {
            hash: jogo.join(""),
            numeros: numeros,
            totalAcertos: totalAcertos,
            cssClass: this.getJogoCssClass(totalAcertos),
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
    this.$el.classList.remove("hidden");
  },
  methods: {
    carregarJogos() {
      if (!this.$refs.inputJogos.value) {
        this.jogos = [];
        return;
      }

      let hashsUnicos = [];
      let jogos = [];
      this.$refs.inputJogos.value.split("\n").forEach((inputJogo) => {
        let jogo = [];
        inputJogo
          .trim()
          .split(config.separador)
          .forEach((numero) => {
            jogo.push(numero.trim().padStart(2, "0"));
          });

        let hash = jogo.join("");
        if (!hashsUnicos.includes(hash)) {
          jogos.push(jogo);
          hashsUnicos.push(hash);
        }
      });

      this.jogos = jogos;
      this.$refs.inputJogos.value = JSON.stringify(jogos);

      /**
       * ! Usado para facilitar a criação dos jogos default.
       * this.$refs.inputJogos.value = JSON.stringify(jogos);
       */
    },

    getJogoCssClass(totalAcertos) {
      switch (totalAcertos) {
        case 4:
          return "jogo-is-quadra";
        case 5:
          return "jogo-is-quina";
        case 6:
          return "jogo-is-sena";
        default:
          return "";
      }
    },

    limpar() {
      this.sorteio = ["", "", "", "", "", "", ""];
    },
  },
});
