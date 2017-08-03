import React, {Component, PropTypes} from 'react';
import url from 'url';

export default class ZipkinUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipkinUrl: '',
      zipkinUrls: []
    };
  }

  componentDidMount() {
    this.props.pubsub.pub('zipkinUrls.load');
    this.props.pubsub.sub('zipkinUrls.status', this.handleZipkinStatuses.bind(this));
  }

  handleZipkinStatuses(statuses) {
    this.setState({
      zipkinUrls: statuses
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const {zipkinUrl} = this.state;
    this.setState({
      zipkinUrl: ''
    });

    let newUrl;
    try {
      if (/https?\:\/\//.exec(zipkinUrl) == null) {
        alert('The URL must start with http:// or https://');
      } else {
        const parsed = url.parse(zipkinUrl);
        const rebuilt = url.format({
          ...parsed,
          pathname: '',
          query: ''
        });

        this.props.pubsub.pub('zipkinUrls.add', rebuilt);
      }
    } catch(err) {
      alert('Couldn\'t parse url: ' + err);
    }
  }

  handleUrlChange(ev) {
    this.setState({
      zipkinUrl: ev.target.value
    });
  }

  handleRemoveUrl(url) {
    this.props.pubsub.pub('zipkinUrls.remove', url);
  }

  render() {
    const hasZipkinUrls = this.state.zipkinUrls.length > 0;
    const alignLeft = {textAlign: 'left', verticalAlign: 'top'};
    return (
      <div style={{width: '400px'}}></div>
    );
  }
}
