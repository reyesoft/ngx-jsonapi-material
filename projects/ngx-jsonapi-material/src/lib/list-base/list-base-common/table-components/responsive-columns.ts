export class ResponsiveColumns {
    public xs?: Array<string>;
    public sm?: Array<string>;
    public md?: Array<string>;
    public lg?: Array<string>;
    public xl?: Array<string>;

    public setXs(columns: Array<string>): this {
        this.xs = columns;

        return this;
    }

    public setSm(columns: Array<string>): this {
        this.sm = columns;

        return this;
    }

    public setMd(columns: Array<string>): this {
        this.md = columns;

        return this;
    }

    public setLg(columns: Array<string>): this {
        this.lg = columns;

        return this;
    }

    public setXl(columns: Array<string>): this {
        this.xl = columns;

        return this;
    }
}
