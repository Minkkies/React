import PropTypes from 'prop-types'

export default function Image({imageUrl}) {
    return(
        <>
            {imageUrl} {/* แสดง URL ของรูปภาพบนรูป */}
            <br />
            <img src= {imageUrl} width="100px" />
        </>    
    )
}

Image.propTypes = {
  imageUrl: PropTypes.string // กำหนดให้ imageUrl ต้องเป็นสตริง
}