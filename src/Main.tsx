import * as React from 'react';
import { App } from './App';
import { Users } from './components/users';

export interface IMainProps
{
    app: App;
}

export class Main extends React.Component<IMainProps, {}>
{
    constructor(props: IMainProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        return (
            <>  <div className="container-fluid">
<Users />
            </div>
                
            </>
        );
    }
}