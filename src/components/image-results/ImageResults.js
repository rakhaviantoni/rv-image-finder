import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/icons/ZoomOutMap';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImageResults extends Component {
    state = {
      open: false,
      currentImg: ''
    };

    handleOpen = image => {
      this.setState({ open: true, currentImg: image });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

  render() {
      let imageListContent;
      const { provider, images } = this.props;

      if(images) {
        if(provider === `1`) {
            imageListContent = (
                <GridList col={3}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Image Results from Pixabay : </ListSubheader>
                    </GridListTile>
                    {images.map(image => (
                    <GridListTile key={image.id}>
                        <img src={image.webformatURL} alt={image.tags} />
                        <GridListTileBar
                            title={image.tags}
                            subtitle={<span>by: {image.user}</span>}
                            actionIcon={
                                <IconButton onClick={() => this.handleOpen(image.largeImageURL)}>
                                  <Zoom style={{ color: 'white' }} />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                    ))}
                </GridList>
            )
        } else if(provider === `2`) {
            imageListContent = (
                <GridList col={3}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Image Results from Unsplash : </ListSubheader>
                    </GridListTile>
                    {images.map(image => (
                    <GridListTile key={image.id} spacing={24}>
                        <img src={image.urls.small} alt={image.description} />
                        <GridListTileBar
                            title={image.description}
                            subtitle={<span>by: {image.user.name}</span>}
                            actionIcon={
                                <IconButton onClick={() => this.handleOpen(image.urls.raw)}>
                                  <Zoom style={{ color: 'white' }} />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                    ))}
                </GridList>
            )
        }
      } else {
        imageListContent = null;
      }

    return (
      <div>
        { imageListContent }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          keepMounted
        >
          <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
        </Dialog>
      </div>
    )
  }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults;
