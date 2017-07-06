// Define a classe com dados relacionados ao vertice.
class Vertices{

    private info: number;
    private status: boolean;

    constructor() { };

    public setInfo(info: number): void {
        this.info = info;
    }

    public getInfo(): number{
        return this.info;
    }

    public setStatus(status: boolean): void {
        this.status = status;
    }

    public getStatus(): boolean{
        return this.status;
    }

}// Classe vértices.

class Arestas{

    private conectado: boolean;
    private peso: number;

    constructor() { };

    public setConectado(conectado: boolean): void{
        this.conectado = conectado;
    }

    public getConectado(): boolean{
        return this.conectado;
    }

    public setPeso(peso: number): void{
        this.peso = peso;
    }

    public getPeso(): number{
        return this.peso;
    }

 }// Classe arestas.

class Grafo{

    private vertices: Vertices[];
    private arestas = [];
    private ordem: number;
    private numVertices: number;

    constructor(ordem: number) {
        this.vertices = []; 
        this.ordem = ordem;
        this.numVertices = 0;

        for (let contador = 0; contador < ordem; contador++)
            this.arestas[contador] = new Array<Arestas>();

        for (let linha = 0; linha < ordem; linha++)
            for (let coluna = 0; coluna < ordem; coluna++) {

                this.arestas[linha][coluna] = new Arestas();

                if (this.arestas[linha][coluna] instanceof Arestas)
                    this.arestas[linha][coluna].setConectado(false);
            }
    };

    // Pesquisa se um vertice existe no grafo.
    public pesquisaVertice(chave: number): number{

        for (let l = 0; l < this.numVertices; l++)
            if (this.vertices[l].getInfo() == chave)
                return l;

        return -1;
    }

    // Insere um vértice no grafo.
    public insereVertice(chave: number): boolean{

        let l: number;
        let vertex: Vertices = new Vertices();

        if (this.numVertices == this.ordem)
            return false;

        l = this.pesquisaVertice(chave);

        if (l != -1)
            return false;

        vertex.setInfo(chave);
        vertex.setStatus(false);
        
        this.vertices.push(vertex);

        this.numVertices++;

        return true;
    }

    // Insere uma aresta no grafo.
    public insereAresta(chaveUm: number, chaveDois: number, peso: number): boolean{

        let l, c, aux: number;
        let edge: Arestas = new Arestas();

        l = this.pesquisaVertice(chaveUm);
        c = this.pesquisaVertice(chaveDois);

        if (l == -1 || c == -1)
            return false;

        edge.setConectado(true);
        edge.setPeso(peso);

        this.arestas[l][c] = edge;
        this.arestas[c][l] = edge;

        return true;
    }

    // Remove um vértice.
    public removeVertice(chave: number): boolean{

        let posicao, contador: number;

        posicao = this.pesquisaVertice(chave);

        if (posicao == -1)
            return false;


        for (contador = 0; contador < this.numVertices; contador++){

            this.arestas[posicao][contador] = this.arestas[posicao][this.numVertices - 1];
            this.arestas[contador][posicao] = this.arestas[this.numVertices - 1][posicao];

        }

        return true;
    }

    // Implementação da busca por largura.
    public bfs(chave: number): boolean{

        let f: Vertices[] = [];
        let elemento: Vertices = new Vertices();
        let i, k, origem: number;

        origem = this.pesquisaVertice(chave);

        if (origem == -1)
            return false;

        for (i = 0; i < this.numVertices; i++)
            this.vertices[i].setStatus(false);

        elemento = this.vertices[origem];
        this.vertices[origem].setStatus(true);

        f.push(elemento);

        while (f.length > 0) {

            elemento = f.shift();
            k = this.pesquisaVertice(elemento.getInfo());

            for (i = 0; i < this.numVertices; i++){
                if(this.arestas[k][i] instanceof Arestas){
                    if (this.arestas[k][i].getConectado() == true && this.vertices[i].getStatus() == false) {
                        elemento = this.vertices[i];
                        console.log('no: ' + elemento.getInfo());
                        f.push(elemento);
                        this.vertices[i].setStatus(true);
                    }
                }
            }
            
        }

        return true;
    }

    // Busca por profundidade.
    public dfs(chave: number): boolean {

        let p: Vertices[] = [];
        let i, k, v, origem: number;
        let elemento: Vertices = new Vertices();

        origem = this.pesquisaVertice(chave);

        if (origem == -1)
            return false;

        for (i = 0; i < this.numVertices; i++)
            this.vertices[i].setStatus(false);

        elemento = this.vertices[origem];
        this.vertices[origem].setStatus(true);

        p.push(elemento);

        while (p.length > 0) {

            // Teria que ser o peek
            elemento = p.pop();
            p.push(elemento);

            k = this.pesquisaVertice(elemento.getInfo());

            for (i = 0; i < this.numVertices; i++) {
                if (this.arestas[k][i] instanceof Arestas) {
                    if (this.arestas[k][i].getConectado() == true && this.vertices[i].getStatus() == false) {
                        v = i;
                        break;
                    }

                    else
                        v = -1;

                }
            }

            if (v == -1)
                elemento = p.pop();

            else {

                elemento = this.vertices[v];
                console.log('no: ' + elemento.getInfo());
                p.push(elemento);
                this.vertices[v].setStatus(true);
                
            }

        }

        return true;
    }

    // Verifica se o grafo está conectado.
    public eConectado(chave: number): boolean{

        let f: Vertices[] = [];
        let elemento: Vertices = new Vertices();
        let i, k, origem, contador: number;

        origem = this.pesquisaVertice(chave);

        if (origem == -1)
            return false;

        for (i = 0; i < this.numVertices; i++)
            this.vertices[i].setStatus(false);

        elemento = this.vertices[origem];
        this.vertices[origem].setStatus(true);
        contador = 1;

        f.push(elemento);

        while (f.length > 0) {

            elemento = f.shift();
            k = this.pesquisaVertice(elemento.getInfo());

            for (i = 0; i < this.numVertices; i++){
                if(this.arestas[k][i] instanceof Arestas){
                    if (this.arestas[k][i].getConectado() == true && this.vertices[i].getStatus() == false) {
                        elemento = this.vertices[i];
                        contador++;
                        f.push(elemento);
                        this.vertices[i].setStatus(true);
                    }
                }
            }
            
        }

        if (contador != this.numVertices)
            return false;

        return true;
    }

    // Verifica se o grafo é regular.
    public eRegular(): boolean{

        let lista: number[] = [];
        let contador: number = 0;

        for (let i = 0; i < this.numVertices; i++) {
            for (let k = 0; k < this.numVertices; k++) {
                if (this.arestas[i][k] instanceof Arestas) {
                    if (this.arestas[i][k].getConectado() == true)
                        contador++;
                }

                else
                    console.log('\nERRO INSTANCEOF\n');
            }

            lista.push(contador);
            contador = 0;
        }

        for (let i = 0; i < this.numVertices; i++) {
            for (let k = 0; k < this.numVertices; k++) {
                if (lista[i] != lista[k])
                    return false;
            }
        }

        return true;
    }

    // Verifica se o grafo é completo.
    public eCompleto(): boolean{

        for (let i = 0; i < this.numVertices; i++)
            for (let k = 0; k < this.numVertices; k++){

                if (this.arestas[i][k] instanceof Arestas) {
                    if (this.arestas[i][k].getConectado() == false) {

                        if (i == k)
                            continue;

                        else 
                            return false;
                    }
                }

                else
                    console.log('\nERRO INSTANCEOF\n');
            }

        return true;
    }

    // Verifica se o grafo é parcial.
    public eParcial(): boolean {

        let contador: number = 0;

        for (let i = 0; i < this.numVertices; i++) {
            for (let k = 0; k < this.numVertices; k++) {
                if (this.arestas[i][k] instanceof Arestas) {
                    if (this.arestas[i][k].getConectado() == true)
                        contador++;
                }

                else
                    return false;
            }
        }

        contador /= 2;

        if (contador != this.numVertices)
            return false;

        return true;

    }

    // Imprime Grafo.
    public imprimeGrafo(): void{

        console.log('\nGrafo criado\n')

        for (let i = 0; i < this.numVertices; i++) {

            console.log('\nVértice: ' + this.vertices[i].getInfo());

            for (let k = 0; k < this.numVertices; k++) {

                if (this.arestas[i][k] instanceof Arestas) {
                    if (this.arestas[i][k].getConectado() == true) {

                        if (i == k)
                            continue;

                        else
                            console.log('--- ' + this.vertices[k].getInfo() + ' com peso ' + 
                            this.arestas[i][k].getPeso());
                    }
                }

                else
                    console.log('\nERRO INSTANCEOF\n');
            }

        }

    }

}// Fim da classe Grafo


const N = 7;
const origem = 0;

let g: Grafo = new Grafo(N);
let contador: number;

for (contador = 0; contador < N; contador++)
    if (g.insereVertice(contador) == false)
        console.log('Erro ao inserir vértice: ' + contador);
    

g.insereAresta(0, 6, 1);
g.insereAresta(0, 1, 4);
g.insereAresta(0, 4, 3);

g.insereAresta(1, 2, 1);
g.insereAresta(1, 4, 1);

g.insereAresta(2, 3, 1);

g.insereAresta(3, 4, 1);
g.insereAresta(3, 5, 1);

/*g.insereAresta(0, 1, 1);
g.insereAresta(0, 3, 1);

g.insereAresta(1, 2, 1);

g.insereAresta(2, 3, 1);*/

g.imprimeGrafo();



console.log('\n\n******* bfs ******* \n\nOrigem: ' + origem + '\n\n');
g.bfs(origem);

console.log('\n******* dfs ******* \n\nOrigem: ' + origem + '\n\n');
g.dfs(origem);


console.log('\n******* Outros *******\n')

// Verfica se é conexo.
if (g.eConectado(origem) == true)
    console.log('\nGrafo é conexo\n');
else
    console.log('\nGrafo não é conexo\n');

// Verfica se é completo.
if (g.eCompleto() == true)
    console.log('\nGrafo é completo\n');
else
    console.log('\nGrafo não é completo\n');

// Verfica se é regular.
if (g.eRegular() == true)
    console.log('\nGrafo é regular\n');
else
    console.log('\nGrafo não é regular\n');

// Verfica se é parcial.
if (g.eParcial() == true)
    console.log('\nGrafo é parcial\n');
else
    console.log('\nGrafo não é parcial\n');

