export type Generator<T> = { next: () => T }
export type Position = { row: number, col: number }
export type Match<T> = { matched: T, positions: Position[] }
export type Refill = {}
export type BoardEvent<T> = { kind: 'Match'; match: Match<T>; } | { kind: 'Refill'; };
export type BoardListener<T> = (event: BoardEvent<T>) => void;

export class Board<T> {
    generator: Generator<T>;
    width: number
    height: number
    listeners: BoardListener<T>[] = [];
    matches: Match<T>[];
    board: (T | undefined)[][];

    constructor(generator: Generator<T>, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.board = [];
        this.matches = [];
        this.generator = generator;

        for (let row = 0; row < height; row++) {
            this.board.push([]);
            for (let col = 0; col < width; col++) {
                this.board[row].push(this.generator.next());
            }
        }

        while (this.findMatches()) {
            this.doMatch();
        }
    }

    addListener(listener: BoardListener<T>) {
        this.listeners.push(listener);
    }

    private notify(event: BoardEvent<T>): void {
        this.listeners.forEach(listener => listener(event));
    }

    positions(): Position[] {
        const positions: Position[] = [];
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                positions.push({row, col});
            }
        }
        return positions;
    }

    piece(p: Position): T | undefined {
        if (p.row < 0 || p.col < 0) return undefined;
        if (p.row < this.height && p.col < this.width) {
            return this.board[p.row][p.col];
        }
        return undefined;
    }

    canMove(first: Position, second: Position): boolean {
        const firstPiece = this.piece(first);
        const secondPiece = this.piece(second);

        if (firstPiece === undefined || secondPiece === undefined || firstPiece === secondPiece || this.checkIfDiagonal(first, second)) {
            return false;
        }

        this.swap(first, second);

        const hasMatch = this.findMatches();

        this.swap(first, second);

        return hasMatch;
    }

    checkIfDiagonal(first: Position, second: Position): boolean {
        return Math.abs(first.row - second.row) === 1 &&
            Math.abs(first.col - second.col) === 1;
    }


    private swap(first: Position, second: Position) {
        const temp = this.board[first.row][first.col];
        this.board[first.row][first.col] = this.board[second.row][second.col];
        this.board[second.row][second.col] = temp;
    }

    move(first: Position, second: Position) {
        if (this.canMove(first, second)) {
            this.swap(first, second);
            if (this.findMatches()) {
                this.doMatch();
                this.doRefill();
            }
        }
    }

    private doMatch() {
        const hasMatches = this.findMatches();

        if (hasMatches) {
            this.matches.forEach(match => {
                match.positions.forEach(pos => {
                    this.board[pos.row][pos.col] = undefined;
                });

                this.notify({ kind: 'Match', match });
            });
            console.log("MATCH :D")
            this.doRefill();
        }
    }



    private doRefill(): void {
        for (let col = 0; col < this.width; col++) {
            let emptyRow = this.height - 1;

            for (let row = this.height - 1; row >= 0; row--) {
                if (this.board[row][col] !== undefined) {
                    this.board[emptyRow][col] = this.board[row][col];
                    emptyRow--;
                }
            }

            for (let row = emptyRow; row >= 0; row--) {
                this.board[row][col] = this.generator.next();
            }
        }

        this.notify({ kind: 'Refill' });
    }




    private findMatches(): boolean {
        this.matches = [];

        const checkMatch = (positions: Position[]): void => {
            const pieces = positions.map(pos => this.piece(pos));

            const isMatch = pieces.every((piece, index) => index === 0 || (piece !== undefined && piece === pieces[0]));

            if (isMatch && pieces[0] !== undefined) {
                this.matches.push({matched: pieces[0], positions});
            }
        };

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                if (col + 2 < this.width) {
                    checkMatch([{row, col}, {row, col: col + 1}, {row, col: col + 2}]);
                }

                if (row + 2 < this.height) {
                    checkMatch([
                        {row, col},
                        {row: row + 1, col},
                        {row: row + 2, col},
                    ]);
                }

            }
        }

        return this.matches.length > 0;
    }
}
