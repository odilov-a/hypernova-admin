import React, {Component} from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import {AsyncPaginate} from "react-select-async-paginate";

import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { api, queryBuilder } from "services";

class AsyncSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    optionValue: PropTypes.string,
    optionLabel: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
    isSearchable: PropTypes.bool,
    isClearable: PropTypes.bool,
    menuPlacement: PropTypes.string,
    filterParams: PropTypes.object,
    extraOptions: PropTypes.array,
    onChange: PropTypes.func,
    loadOptionsKey: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
    loadOptionsParams: PropTypes.func,
    optionRenderer: PropTypes.func,
    isCustomLabel: PropTypes.bool
  };

  static defaultProps = {
    title: "",
    className: null,
    optionValue: "id",
    optionLabel: "title",
    isSearchable: false,
    isClearable: false,
    menuPlacement: "bottom",
    disableOptions: [],
    loadOptionsKey: 'data',
    extraOptions: [],
    filterParams: {},
    loadOptionsParams: () => {},
    optionRenderer: () => {},
    isCustomLabel: false,
    onChange: () => {}
  };

  load = async(search, prevOptions, { page }, url, filterParams, loadOptionsParams, loadOptionsKey, extraOptions) => {
    const { data } = await api.request.get(
      queryBuilder(url, { page, filter: filterParams, ...loadOptionsParams(search) })
    );

    return {
      options: loadOptionsKey
        ? typeof loadOptionsKey === "function"
          ? [...extraOptions, ...loadOptionsKey(data)]
          : [...extraOptions, ...get(data, loadOptionsKey, [])]
        : data,
      hasMore: get(data, "_meta.currentPage", 1) < get(data, "_meta.pageCount", 1),
      additional: { page: get(data, "_meta.currentPage", 1) + 1 }
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.loadOptionsUrl && (prevProps.loadOptionsUrl !== this.props.loadOptionsUrl)){
      this.setState({isLoading: true}, () => this.setState({isLoading: false}))
    }
    if(!isEqual(prevProps.filterParams, this.props.filterParams)){
      this.setState({isLoading: true}, () => this.setState({isLoading: false}))
    }
  }

  render() {
    const {
      isDisabled,
      disableOptions,
      className,
      label,
      isMulti,
      loadOptionsKey,
      placeholder,
      options,
      field,
      optionLabel,
      optionValue,
      form: { errors, setFieldValue, setFieldTouched, touched },
      isSearchable,
      isClearable,
      menuPlacement,
      loadOptionsUrl,
      extraOptions,
      filterParams,
      onChange,
      loadOptionsParams,
      isCustomLabel,
      optionRenderer
    } = this.props;

    const classNames = cx(
      "field-container async-field",
      touched[field.name] && errors[field.name] && "has-error",
      className
    );

    const customStyles = {
      menu: props => ({
        ...props,
        zIndex: 10
      }),
      control: props => ({
        ...props,
        minHeight: '40px'
      }),
      placeholder: props => ({
        ...props,
        whiteSpace: 'nowrap'
      })
    };

    const { isLoading } = this.state;

    return (
      <div className={classNames}>
        <div>
          {label && <div>{label}</div>}
          {!isLoading && (
            <AsyncPaginate
              styles={customStyles}
              id={field.name}
              name={field.name}
              debounceTimeout={300}
              onChange={option => {
                onChange(option);
                setFieldValue(field.name, option)
              }}
              components={isCustomLabel ? {Option: optionRenderer} : {}}
              onBlur={() => setFieldTouched(field.name, true)}
              getValue={option => option[optionValue]}
              getOptionLabel={option => typeof optionLabel === "function" ? optionLabel(option) : option[optionLabel]}
              getOptionValue={option => typeof optionValue === "function" ? optionValue(option) : option[optionValue]}
              value={field.value}
              additional={{ page: 1 }}
              isClearable={isClearable}
              isDisabled={isDisabled}
              loadOptions={(search, prevOptions, { page }) =>
                this.load(search, prevOptions, { page }, loadOptionsUrl, filterParams, loadOptionsParams, loadOptionsKey, extraOptions)
              }
              isOptionDisabled={option =>
                disableOptions
                  .reduce((prev, curr) => [...prev, curr.id], [])
                  .includes(option.id)
              }
              {...{ isMulti, options, placeholder, isSearchable, menuPlacement }}
            />
          )}
          {touched[field.name] && errors[field.name] && (
            <div className="ant-form-explain">{errors[field.name]}</div>
          )}
        </div>
      </div>
    );
  }
}

export default AsyncSelect;
