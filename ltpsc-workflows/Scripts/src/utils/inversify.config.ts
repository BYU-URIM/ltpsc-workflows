import getDecorators from 'inversify-inject-decorators'
import { Container } from "inversify";
import ListDataStore from '../stores/ListDataStore';


const myContainer = new Container()
myContainer.bind<ListDataStore>(ListDataStore).toSelf().inSingletonScope()


let { lazyInject } = getDecorators(myContainer)

export default myContainer;
export { lazyInject as inject }
